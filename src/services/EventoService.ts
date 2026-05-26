import { pool } from '../config/database.js'
import { EventoRepository } from '../repositories/EventoRepository.js';
import { PartidaRepository } from '../repositories/PartidaRepository.js';
import { CreateEventoDTO } from '../dtos/CreateEventoDTO.js';

const eventoRepository = new EventoRepository();
const partidaRepository = new PartidaRepository();

export class EventoService {
  async lancarEvento(dados: CreateEventoDTO) {
    // 1. Grava o evento na tabela de eventos
    const novoEvento = await eventoRepository.create(dados);

    // 2. REGRA DE NEGÓCIO: Se for gol, atualiza o placar da partida de forma inteligente
    if (dados.tipo_evento.toLowerCase() === 'gol') {
      const partida = await partidaRepository.findSumulaDados(dados.id_partida);
      
      if (partida) {
        // Verifica se o gol foi do time da casa (mandante) ou de fora (visitante)
        if (Number(dados.id_clube) === Number(partida.id_mandante)) {
          await pool.query('UPDATE partidas SET gols_mandante = gols_mandante + 1 WHERE id_partida = $1', [dados.id_partida]);
        } else if (Number(dados.id_clube) === Number(partida.id_visitante)) {
          await pool.query('UPDATE partidas SET gols_visitante = gols_visitante + 1 WHERE id_partida = $1', [dados.id_partida]);
        }
      }
    }

    return novoEvento;
  }

  // ATUALIZAÇÃO DA SÚMULA: Junta os dados da partida + a lista de eventos reais
  async obterSumulaCompleta(id_partida: number) {
    const partida = await partidaRepository.findSumulaDados(id_partida);
    if (!partida) throw new Error('Partida não encontrada.');

    // Busca todos os gols e cartões que aconteceram nessa partida
    const eventos = await eventoRepository.findByPartida(id_partida);

    return {
      detalhes_partida: partida,
      sumula_eventos: eventos
    };
  }
}
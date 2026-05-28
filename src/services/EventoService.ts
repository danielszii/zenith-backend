import { pool } from '../config/database.js'
import { EventoRepository } from '../repositories/EventoRepository.js';
import { PartidaRepository } from '../repositories/PartidaRepository.js';
import { CreateEventoSumulaDTO } from '../dtos/CreateEventoSumulaDTO.js';

const eventoRepository = new EventoRepository();
const partidaRepository = new PartidaRepository();

export class EventoService {
  async lancarEvento(dados: CreateEventoSumulaDTO) {
    // 1. Busca os dados da partida PRIMEIRO
    const partida = await partidaRepository.findSumulaDados(dados.id_partida);
    
    if (!partida) {
      throw new Error('Partida não encontrada.');
    }

    // 2. REGRA DE NEGÓCIO: Impede eventos fora do horário do jogo
    if (partida.status === 'agendado') {
      throw new Error('Não é possível lançar eventos em uma partida que ainda não começou.');
    }
    if (partida.status === 'encerrado') {
      throw new Error('A súmula desta partida já foi fechada e não pode receber novos eventos.');
    }

    // 3. Se o status for 'em_andamento', grava o evento na tabela
    const novoEvento = await eventoRepository.create(dados);
    const tipoEvento = dados.tipo_evento.toLowerCase();

    // 4. Atualiza o placar reaproveitando os dados da 'partida' já buscada
    if (tipoEvento === 'gol') {
      if (Number(dados.id_clube) === Number(partida.id_mandante)) {
        await pool.query('UPDATE partidas SET gols_mandante = gols_mandante + 1 WHERE id_partida = $1', [dados.id_partida]);
      } else if (Number(dados.id_clube) === Number(partida.id_visitante)) {
        await pool.query('UPDATE partidas SET gols_visitante = gols_visitante + 1 WHERE id_partida = $1', [dados.id_partida]);
      }
    } else if (tipoEvento === 'gol_contra') {
      if (Number(dados.id_clube) === Number(partida.id_mandante)) {
        // Gol contra do mandante = ponto para o visitante
        await pool.query('UPDATE partidas SET gols_visitante = gols_visitante + 1 WHERE id_partida = $1', [dados.id_partida]);
      } else if (Number(dados.id_clube) === Number(partida.id_visitante)) {
        // Gol contra do visitante = ponto para o mandante
        await pool.query('UPDATE partidas SET gols_mandante = gols_mandante + 1 WHERE id_partida = $1', [dados.id_partida]);
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
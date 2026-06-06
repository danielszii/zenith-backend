import { EventoRepository } from '../repositories/EventoRepository.js';
import { PartidaRepository } from '../repositories/PartidaRepository.js';
import { CreateEventoSumulaDTO } from '../dtos/CreateEventoSumulaDTO.js';
import { BusinessRuleError, NotFoundError } from '../errors/AppError.js';

const eventoRepository = new EventoRepository();
const partidaRepository = new PartidaRepository();

export class EventoService {
  async lancarEvento(dados: CreateEventoSumulaDTO) {
    // 1. Busca os dados da partida PRIMEIRO
    const partida = await partidaRepository.findSumulaDados(dados.id_partida);

    if (!partida) {
      throw new NotFoundError('Partida não encontrada.');
    }

    // 2. REGRA DE NEGÓCIO: Impede eventos fora do horário do jogo
    if (partida.status === 'agendado') {
      throw new BusinessRuleError('Não é possível lançar eventos em uma partida que ainda não começou.');
    }
    if (partida.status === 'encerrado') {
      throw new BusinessRuleError('A súmula desta partida já foi fechada e não pode receber novos eventos.');
    }

    // 3. Se o status for 'em_andamento', grava o evento na tabela
    const novoEvento = await eventoRepository.create(dados);
    const tipoEvento = dados.tipo_evento.toLowerCase();

    // 4. Atualiza o placar reaproveitando os dados da 'partida' já buscada
    if (tipoEvento === 'gol') {
      if (Number(dados.id_clube) === Number(partida.id_mandante)) {
        await partidaRepository.incrementarGolMandante(dados.id_partida);
      } 
      else if (Number(dados.id_clube) === Number(partida.id_visitante)) {
        await partidaRepository.incrementarGolVisitante(dados.id_partida);
      }
    } 
    return novoEvento;
  }

  // Junta os dados da partida + a lista de eventos reais
  async obterSumulaCompleta(id_partida: number) {
    const partida = await partidaRepository.findSumulaDados(id_partida);
    if (!partida) {
      throw new NotFoundError('Partida não encontrada.');
    }

    // Busca todos os gols e cartões que aconteceram nessa partida
    const eventos = await eventoRepository.findByPartida(id_partida);
    return {
      detalhes_partida: partida,
      sumula_eventos: eventos
    };
  }
}
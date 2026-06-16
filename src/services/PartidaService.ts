import { PartidaRepository } from '../repositories/PartidaRepository.js';
import { EventoRepository } from '../repositories/EventoRepository.js'; // Adicionado para puxar a súmula
import { CreatePartidaDTO } from '../dtos/CreatePartidaDTO.js';
import { Partida } from '../models/Partida.js';
import { NotFoundError, BusinessRuleError } from '../errors/AppError.js';

const partidaRepository = new PartidaRepository();
const eventoRepository = new EventoRepository();

export class PartidaService {
  async agendarPartida(dados: CreatePartidaDTO) {
    if (String(dados.id_mandante) === String(dados.id_visitante)) {
      throw new BusinessRuleError('O clube mandante não pode ser igual ao clube visitante.');
    }
    // Instancia o Model usando o método construir antes de enviar ao repositório
    const novaPartida = Partida.construir(String(dados.id_campeonato), String(dados.id_mandante), String(dados.id_visitante), dados.local, new Date(dados.data), dados.hora, dados.status);
    return await partidaRepository.create(novaPartida);
  }

  async listarPartidas() {
    return await partidaRepository.findAll();
  }

  async buscarPorId(id: string) {
    const partida = await partidaRepository.findById(id);
    if (!partida) {
      throw new NotFoundError('Partida não encontrada.');
    }
    return partida;
  }


  async obterSumulaCompleta(id_partida: string) {
    const partida = await partidaRepository.findSumulaDados(id_partida);
    if (!partida) throw new NotFoundError('Partida não encontrada.');

    // Busca os eventos REAIS no banco de dados
    const eventos = await eventoRepository.findByPartida(id_partida);

    return {
      detalhes_partida: partida,
      sumula_eventos: eventos
    };
  }

  async alterarStatus(id: string, novoStatus: 'agendado' | 'em_andamento' | 'encerrado' | 'cancelado') {
    const partida = await this.buscarPorId(id);
    const statusAtual = partida.status;

    // REGRA DE NEGÓCIO: Transição de status da partida
    if (statusAtual === 'encerrado') {
      throw new BusinessRuleError('A partida já foi encerrada. O status não pode ser alterado.');
    }
    if (statusAtual === 'cancelado') {
      throw new BusinessRuleError('Esta partida foi cancelada e não pode ser reativada.');
    }
    // Permitir apenas as transições lógicas do futebol
    if (statusAtual === 'agendado' && novoStatus === 'encerrado') {
      throw new BusinessRuleError('Não é possível encerrar uma partida que não está em andamento.');
    }
    if (statusAtual === 'em_andamento' && novoStatus === 'agendado') {
      throw new BusinessRuleError('A partida já iniciou. Ela não pode voltar a ser agendada.');
    }
    if (statusAtual === novoStatus) {
      throw new BusinessRuleError(`A partida já encontra-se com o status '${novoStatus}'.`);
    }

    return await partidaRepository.updateStatus(id, novoStatus);
  }
}
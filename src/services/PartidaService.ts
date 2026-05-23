import { PartidaRepository } from '../repositories/PartidaRepository.js';
import { CreatePartidaDTO } from '../dtos/CreatePartidaDTO.js';

const partidaRepository = new PartidaRepository();

export class PartidaService {
  
  async agendarPartida(dados: CreatePartidaDTO) {
    return await partidaRepository.create(dados);
  }

  async listarPartidas() {
    return await partidaRepository.findAll();
  }

  async buscarPorId(id: number) {
    const partida = await partidaRepository.findById(id);
    if (!partida) {
      throw new Error('Partida não encontrada.');
    }
    return partida;
  }

  async alterarStatus(id: number, novoStatus: 'agendado' | 'em_andamento' | 'encerrado' | 'cancelado') {
    const partida = await this.buscarPorId(id);
    const statusAtual = partida.status_partida;

    // Regras de negócio para transição de status
    if (statusAtual === 'encerrado') {
      throw new Error('A partida já foi encerrada. O status não pode ser alterado.');
    }
    if (statusAtual === 'cancelado') {
      throw new Error('Esta partida foi cancelada e não pode ser reativada.');
    }
    // Permitir apenas as transições válidas
    if (statusAtual === 'agendado' && novoStatus === 'encerrado') {
      throw new Error('Não é possível encerrar uma partida que não está em andamento.');
    }
    if (statusAtual === 'em_andamento' && novoStatus === 'agendado') {
      throw new Error('A partida já iniciou. Ela não pode voltar a ser agendada.');
    }
    if (statusAtual === novoStatus) {
      throw new Error(`A partida já encontra-se com o status '${novoStatus}'.`);
    }

    return await partidaRepository.updateStatus(id, novoStatus);
  }
}
import { PartidaRepository } from '../repositories/PartidaRepository.js';
import { CreatePartidaDTO } from '../dtos/CreatePartidaDTO.js';
import { Request, Response } from 'express';


const partidaRepository = new PartidaRepository();

export class PartidaService {
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

  async agendarPartida(dados: any) {
    // REGRA DE NEGÓCIO: Valida o cruzamento das duas entidades (Mandante e Visitante)
    if (Number(dados.id_mandante) === Number(dados.id_visitante)) {
      throw new Error('O clube mandante não pode ser igual ao clube visitante.');
    }

    return await partidaRepository.create(dados);
  }

  async obterSumulaCompleta(id_partida: number) {
    const partida = await partidaRepository.findSumulaDados(id_partida);
    if (!partida) throw new Error('Partida não encontrada.');

    // Buscaremos os eventos aqui para anexar na súmula
    return {
      detalhes_partida: partida,
      eventos: [] 
    };
  }

  async alterarStatus(id: number, novoStatus: 'agendado' | 'em_andamento' | 'encerrado' | 'cancelado') {
    const partida = await this.buscarPorId(id);
    const statusAtual = partida.status_partida;

    // REGRA DE NEGÓCIO: Transição de de status da partida
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
import { CampeonatoRepository } from '../repositories/CampeonatoRepository.js';

const campeonatoRepository = new CampeonatoRepository();

export class CampeonatoService {
  async criarCampeonato(dados: any) {
    return await campeonatoRepository.create(dados);
  }

  async listarCampeonatos() {
    return await campeonatoRepository.findAll();
  }

  async buscarPorId(id: number) {
    const campeonato = await campeonatoRepository.findById(id);
    if (!campeonato) {
      throw new Error('Campeonato não encontrado.');
    }
    return campeonato;
  }

  async atualizarCampeonato(id: number, dados: any) {
    return await campeonatoRepository.update(id, dados);
  }

  async deletarCampeonato(id: number) {
    return await campeonatoRepository.delete(id);
  }
}
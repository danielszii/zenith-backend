import { CampeonatoRepository } from '../repositories/CampeonatoRepository.js';

const campeonatoRepository = new CampeonatoRepository();

export class CampeonatoService {
  async criarCampeonato(dados: any) {
    return await campeonatoRepository.create(dados);
  }

  async listarCampeonatos() {
    return await campeonatoRepository.findAll();
  }

  async atualizarCampeonato(id: number, dados: any) { return await campeonatoRepository.update(id, dados); }
  async deletarCampeonato(id: number) { return await campeonatoRepository.delete(id); }
}
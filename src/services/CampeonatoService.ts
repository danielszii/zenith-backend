import { CampeonatoRepository } from '../repositories/CampeonatoRepository.js';
import { Campeonato } from '../models/Campeonato.js';
import { CreateCampeonatoDTO } from '../dtos/CreateCampeonatoDTO.js';

const campeonatoRepository = new CampeonatoRepository();

export class CampeonatoService {
  async criarCampeonato(dados: CreateCampeonatoDTO) {
    const campeonato = Campeonato.construir(dados.nome, dados.data_inicio, dados.data_fim, dados.local, dados.modalidade);
    return await campeonatoRepository.create(campeonato);
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
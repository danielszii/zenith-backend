import { AtletaRepository } from '../repositories/AtletaRepository.js';
import { CreateAtletaDTO } from '../dtos/CreateAtletaDTO.js';

const atletaRepository = new AtletaRepository();

export class AtletaService {
  async registrarAtleta(dados: CreateAtletaDTO) {
    return await atletaRepository.create(dados);
  }

  async listarAtletas() {
    return await atletaRepository.findAll();
  }

  async atualizarAtleta(id: number, dados: CreateAtletaDTO) { return await atletaRepository.update(id, dados); }
  async deletarAtleta(id: number) { return await atletaRepository.delete(id); }

  async buscarPorId(id: number) {
  return await atletaRepository.findById(id);
}


}
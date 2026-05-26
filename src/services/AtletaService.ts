import { AtletaRepository } from '../repositories/AtletaRepository.js';
import { CreateAtletaDTO } from '../dtos/CreateAtletaDTO.js';
import { Atleta } from '../models/Atleta.js';

const atletaRepository = new AtletaRepository();

export class AtletaService {
  async registrarAtleta(dados: CreateAtletaDTO) {
    const atleta = Atleta.construir(dados.nome, dados.cpf, new Date(dados.data_nasc), dados.tipo_sanguineo);
    return await atletaRepository.create(atleta);
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
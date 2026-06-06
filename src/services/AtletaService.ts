import { AtletaRepository } from '../repositories/AtletaRepository.js';
import { CreateAtletaDTO } from '../dtos/CreateAtletaDTO.js';
import { Atleta } from '../models/Atleta.js';
import { NotFoundError } from '../errors/AppError.js';

const atletaRepository = new AtletaRepository();

export class AtletaService {
  async registrarAtleta(dados: CreateAtletaDTO) {
    const atleta = Atleta.construir(dados.nome, dados.cpf, dados.data_nasc, dados.tipo_sanguineo, dados.id_clube, dados.rg, dados.peso, dados.altura, dados.status);
    return await atletaRepository.create(atleta);
  }

  async listarAtletas() {
    return await atletaRepository.findAll();
  }

  async atualizarAtleta(id: string, dados: Partial<CreateAtletaDTO>) {
    return await atletaRepository.update(id, dados);
  }

  async deletarAtleta(id: string) {
    return await atletaRepository.delete(id);
  }

  async buscarPorId(id: string) {
    const atleta = await atletaRepository.findById(id);
    if (!atleta) {
      throw new NotFoundError('Atleta não encontrado.');
    }
    return atleta;
  }
}
import { AtletaRepository } from '../repositories/AtletaRepository.js';
import { CreateAtletaDTO } from '../dtos/CreateAtletaDTO.js';
import { Atleta } from '../models/Atleta.js';
import { NotFoundError } from '../errors/NotFoundError.js';

export class AtletaService {

  public constructor(private readonly AtletaRepository: AtletaRepository) { }

  async registrarAtleta(dados: CreateAtletaDTO) {
    const atleta = Atleta.construir(dados.nome, dados.cpf, dados.data_nasc, dados.tipo_sanguineo, dados.id_clube, dados.rg, dados.peso, dados.altura, dados.status);
    return await this.AtletaRepository.create(atleta);
  }

  async listarAtletas() {
    return await this.AtletaRepository.findAll();
  }

  async atualizarAtleta(id: string, dados: Partial<CreateAtletaDTO>) {
    return await this.AtletaRepository.update(id, dados);
  }

  async deletarAtleta(id: string) {
    return await this.AtletaRepository.delete(id);
  }

  async buscarPorId(id: string) {
    const atleta = await this.AtletaRepository.findById(id);
    if (!atleta) {
      throw new NotFoundError('Atleta não encontrado.');
    }
    return atleta;
  }
}
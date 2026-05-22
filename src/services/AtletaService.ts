import { AtletaRepository } from '../repositories/AtletaRepository.js';

const atletaRepository = new AtletaRepository();

export class AtletaService {
  async registrarAtleta(dados: any) {
    // Chama o método simples que acabamos de alinhar no seu repositório
    return await atletaRepository.create(dados);
  }

  async listarAtletas() {
    return await atletaRepository.findAll();
  }

  async atualizarAtleta(id: number, dados: any) { return await atletaRepository.update(id, dados); }
  async deletarAtleta(id: number) { return await atletaRepository.delete(id); }
}
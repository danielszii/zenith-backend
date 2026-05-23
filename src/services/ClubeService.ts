import { ClubeRepository } from '../repositories/ClubeRepository.js';

const clubeRepository = new ClubeRepository();

export class ClubeService {
    async criarClube(dados: any) {
        return await clubeRepository.create(dados);
    }

    async listarClubes() {
        return await clubeRepository.findAll();
    }

    async atualizarClube(id: number, dados: any) { return await clubeRepository.update(id, dados); }
    async deletarClube(id: number) { return await clubeRepository.delete(id); }

    async buscarPorId(id: number) {
         const clube = await clubeRepository.findById(id);
        if (!clube) {
            throw new Error('Clube não encontrado.');
        }
        return clube;
    }
}
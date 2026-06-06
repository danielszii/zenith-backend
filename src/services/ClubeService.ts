import { ClubeRepository } from '../repositories/ClubeRepository.js';
import { CreateClubeDTO } from '../dtos/CreateClubeDTO.js';
import { Clube } from '../models/Clube.js';
import { NotFoundError } from '../errors/AppError.js';

const clubeRepository = new ClubeRepository();

export class ClubeService {
    async criarClube(dados: CreateClubeDTO) {
        const clube = Clube.construir(dados.nome, dados.brasao, dados.cores_oficiais, dados.responsavel, dados.cnpj);
        return await clubeRepository.create(clube);
    }

    async listarClubes() {
        return await clubeRepository.findAll();
    }

    async atualizarClube(id: number, dados: CreateClubeDTO) { 
        return await clubeRepository.update(id, dados); 
    }

    async deletarClube(id: number) { 
        return await clubeRepository.delete(id); 
    }

    async buscarPorId(id: number) {
        const clube = await clubeRepository.findById(id);
        if (!clube) {
            throw new NotFoundError('Clube não encontrado.');
        }
        return clube;
    }
}
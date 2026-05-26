import { Request, Response } from 'express';
import { AtletaRepository } from '../repositories/AtletaRepository.js';
import { AtletaService } from '../services/AtletaService.js';
import { plainToInstance } from 'class-transformer';
import { CreateAtletaDTO } from '../dtos/CreateAtletaDTO.js';
import { validate } from 'class-validator';

const atletaService = new AtletaService();
const repository = new AtletaRepository();

export class AtletaController {

  
  //Método para criar um novo registro (POST)
  
  async store(req: Request, res: Response) {
    try {

      
      const novoAtleta = await atletaService.registrarAtleta(req.body);
      return res.status(201).json(novoAtleta);

    } catch (error: any) {
      return res.status(500).json({
        error: 'Erro interno ao processar atleta',
        message: error.message
      });
    }
  }

  async index(req: Request, res: Response) {
    try {
      const atletas = await repository.findAll();
      return res.json(atletas);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar atletas' });
    }
  }

  async show(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const atleta = await atletaService.buscarPorId(Number(id));
      if (!atleta) return res.status(404).json({ error: 'Atleta não encontrado' });
      return res.json(atleta);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const atualizado = await atletaService.atualizarAtleta(Number(id), req.body);
      return res.json(atualizado);
    } catch (error: any) { return res.status(400).json({ error: error.message }); }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await atletaService.deletarAtleta(Number(id));
      return res.status(204).send(); // 204 significa Sucesso sem conteúdo de retorno
    } catch (error: any) { return res.status(400).json({ error: error.message }); }
  }
}
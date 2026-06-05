import { Request, Response, NextFunction } from 'express';
import { AtletaRepository } from '../repositories/AtletaRepository.js';
import { AtletaService } from '../services/AtletaService.js';
import { NotFoundError } from '../errors/AppError.js';

const atletaService = new AtletaService();

// Instanciamos o repositório para usar dentro da classe
const repository = new AtletaRepository();

export class AtletaController {
   //Método para criar um novo registro (POST)
  async store(req: Request, res: Response, next: NextFunction) {
    try {
      // 1. Coleta os dados do corpo da requisição
      const { nome, cpf, data_nasc, status, peso, altura } = req.body;

      // 2. Chama o repositório para executar o SQL
      const novoAtleta = await atletaService.registrarAtleta(req.body);

      // 3. Retorna o status 201 (Created) e o objeto criado
      return res.status(201).json(novoAtleta);
    } catch (error) {
        next(error); // Passa o erro para o Middleware Global
    }
  }

  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const atletas = await atletaService.listarAtletas();
      return res.json(atletas);
    } catch (error) {
        next(error); // Passa o erro para o Middleware Global
    }
  }

  async show(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const atleta = await atletaService.buscarPorId(Number(id));
      if (!atleta){
        throw new NotFoundError('Atleta não encontrado');
      } 
      return res.json(atleta);
    } catch (error) {
        next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const atualizado = await atletaService.atualizarAtleta(Number(id), req.body);
      return res.json(atualizado);
    } catch (error: any) { 
        next(error);
    }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await atletaService.deletarAtleta(Number(id));
      return res.status(204).send(); // 204 significa Sucesso sem conteúdo de retorno

    } catch (error) { 
      next(error); 
    }
  }
}

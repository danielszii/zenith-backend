import { Request, Response, NextFunction } from 'express';
import { AtletaService } from '../services/AtletaService.js';
import { NotFoundError } from '../errors/AppError.js';

const atletaService = new AtletaService();

export class AtletaController {
   //Método para criar um novo registro (POST)
  async store(req: Request, res: Response, next: NextFunction) {
    try {
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
      const atleta = await atletaService.buscarPorId(String(id));
      // if (!atleta){
      //   throw new NotFoundError('Atleta não encontrado');
      // } 
      return res.json(atleta);
    } catch (error) {
        next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const atualizado = await atletaService.atualizarAtleta(String(id), req.body);
      return res.json(atualizado)
    } catch (error) { 
        next(error);
    }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await atletaService.deletarAtleta(String(id));
      return res.status(204).send(); // 204 significa Sucesso sem conteúdo de retorno

    } catch (error) { 
      next(error); 
    }
  }
}

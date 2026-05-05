import { Request, Response } from 'express';
import { AtletaRepository } from '../repositories/AtletaRepository.js';

// Instanciamos o repositório para usar dentro da classe
const repository = new AtletaRepository();

export class AtletaController {
  
  /**
   * Método para criar um novo registro (POST)
   */
  async store(req: Request, res: Response) {
    try {
      // 1. Coleta os dados do corpo da requisição (Baseado no seu DER)[cite: 2]
      const { nome, cpf, data_nasc, status, peso, altura } = req.body;

      // 2. Chama o repositório para executar o SQL
      const novoAtleta = await repository.create({
        nome, cpf, data_nasc, status, peso, altura
      });

      // 3. Retorna o status 201 (Created) e o objeto criado
      return res.status(201).json(novoAtleta);
      
    } catch (error: any) {
      // 4. Tratamento de erro básico
      return res.status(500).json({ 
        error: 'Erro interno ao processar atleta',
        message: error.message 
      });
    }
  }

  /**
   * Método para listar registros (GET)
   */
  async index(req: Request, res: Response) {
    try {
      const atletas = await repository.findAll();
      return res.json(atletas);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar atletas' });
    }
  }
}
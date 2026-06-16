import { Request, Response, NextFunction } from 'express';
import { PartidaService } from '../services/PartidaService.js';
import { BadRequestError } from '../errors/BadRequestError.js';

export class PartidaController {

  public constructor(private readonly PartidaService: PartidaService) { }

  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const partidas = await this.PartidaService.listarPartidas();
      return res.json(partidas);
    } catch (error) {
      next(error);
    }
  }

  async show(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const partida = await this.PartidaService.buscarPorId(String(id));
      return res.json(partida);
    } catch (error) {
      next(error);
    }
  }

  async updateStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!['agendado', 'em_andamento', 'encerrado', 'cancelado'].includes(status)) {
        throw new BadRequestError('Status inválido fornecido. Os valores aceitos são: agendado, em_andamento, encerrado ou cancelado.');
      }

      const partidaAtualizada = await this.PartidaService.alterarStatus(String(id), status);
      return res.json(partidaAtualizada);
    } catch (error) {
      next(error);
    }
  }
  async store(req: Request, res: Response, next: NextFunction) {
    try {
      const novaPartida = await this.PartidaService.agendarPartida(req.body);
      return res.status(201).json(novaPartida);
    } catch (error) {
      next(error);
    }
  }

  async showSumula(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const sumula = await this.PartidaService.obterSumulaCompleta(String(id));
      return res.json(sumula);
    } catch (error) {
      next(error);
    }
  }
}
import { Request, Response, NextFunction } from 'express';
import { EventoService } from '../services/EventoService.js';

const eventoService = new EventoService();

export class EventoController {
  async store(req: Request, res: Response, next: NextFunction) {
    try {
      const novoEvento = await eventoService.lancarEvento(req.body);
      return res.status(201).json(novoEvento);
    } catch (error) {
      next(error);
    }
  }
}
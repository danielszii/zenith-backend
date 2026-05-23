import { Request, Response } from 'express';
import { EventoService } from '../services/EventoService.js';

const eventoService = new EventoService();

export class EventoController {
  async store(req: Request, res: Response) {
    try {
      const novoEvento = await eventoService.lancarEvento(req.body);
      return res.status(201).json(novoEvento);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
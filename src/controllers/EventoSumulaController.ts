import { Request, Response } from 'express';
import { EventoSumulaService } from '../services/EventoSumulaService.js';

const eventoService = new EventoSumulaService();

export class EventoSumulaController {
  
  async store(req: Request, res: Response) {
    try {
      // O id_partida vem da URL, os dados do evento vêm do corpo (body)
      const { id_partida } = req.params;
      
      const novoEvento = await eventoService.registrarEvento(Number(id_partida), req.body);
      return res.status(201).json(novoEvento);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async index(req: Request, res: Response) {
    try {
      const { id_partida } = req.params;
      const eventos = await eventoService.listarEventosDaPartida(Number(id_partida));
      return res.json(eventos);
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }
}
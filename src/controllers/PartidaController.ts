import { Request, Response } from 'express';
import { PartidaService } from '../services/PartidaService.js';

const partidaService = new PartidaService();

export class PartidaController {
  async index(req: Request, res: Response) {
    try {
      const partidas = await partidaService.listarPartidas();
      return res.json(partidas);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async show(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const partida = await partidaService.buscarPorId(Number(id));
      return res.json(partida);
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }

  async updateStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status } = req.body; 

      if (!['agendado', 'em_andamento', 'encerrado', 'cancelado'].includes(status)) {
        return res.status(400).json({ error: 'Status inválido fornecido.' });
      }

      const partidaAtualizada = await partidaService.alterarStatus(Number(id), status);
      return res.json(partidaAtualizada);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
  async store(req: Request, res: Response) {
    try {
      const novaPartida = await partidaService.agendarPartida(req.body);
      return res.status(201).json(novaPartida);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async showSumula(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const sumula = await partidaService.obterSumulaCompleta(Number(id));
      return res.json(sumula);
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }
}
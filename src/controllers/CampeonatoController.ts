import { Request, Response } from 'express';
import { CampeonatoService } from '../services/CampeonatoService.js';

const campeonatoService = new CampeonatoService();

export class CampeonatoController {
    async store(req: Request, res: Response) {
        try {
            // O req.body aqui já chega 100% validado e transformado pelo middleware do DTO
            const novoCampeonato = await campeonatoService.criarCampeonato(req.body);
            return res.status(201).json(novoCampeonato);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

    async index(req: Request, res: Response) {
        try {
            const campeonatos = await campeonatoService.listarCampeonatos();
            return res.json(campeonatos);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    async show(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const campeonato = await campeonatoService.buscarPorId(Number(id));
            return res.json(campeonato);
        } catch (error: any) {
            return res.status(44) // 404 Not Found se não existir
            return res.status(404).json({ error: error.message });
        }
    }
}
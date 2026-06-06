import { Request, Response } from "express";
import { ClubeService } from "../services/ClubeService.js";

const clubeService = new ClubeService();

export class ClubeController {
    async store(req: Request, res: Response) {
        try {
            const novoClube = await clubeService.criarClube(req.body);

            return res.status(201).json(novoClube);

        } catch (error: any) {
            return res.status(500).json({
                error: 'Erro interno ao processar clube',
                message: error.message
            });
        }
    }

    async index(req: Request, res: Response) {
        try {
            const clubes = await clubeService.listarClubes();
            return res.json(clubes);
        } catch (error: any) {
            return res.status(500).json({
                error: 'Erro interno ao buscar clubes',
                message: error.message
            });
        }
    }
    async show(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const clube = await clubeService.buscarPorId(Number(id));
            return res.json(clube);
        } catch (error: any) {
            return res.status(404).json({ error: error.message });
        }
    }


    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const atualizado = await clubeService.atualizarClube(Number(id), req.body);
            return res.json(atualizado);
        } catch (error: any) { return res.status(400).json({ error: error.message }); }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await clubeService.deletarClube(Number(id));
            return res.status(204).send();
        } catch (error: any) { return res.status(400).json({ error: error.message }); }
    }
}

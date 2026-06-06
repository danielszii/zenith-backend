import { Request, Response, NextFunction } from "express";
import { ClubeService } from "../services/ClubeService.js";

const clubeService = new ClubeService();

export class ClubeController {
    async store(req: Request, res: Response, next: NextFunction) {
        try {
            const novoClube = await clubeService.criarClube(req.body);

            return res.status(201).json(novoClube);

        } catch (error) {
            next(error);
        }
    }

    async index(req: Request, res: Response, next: NextFunction) {
        try {
            const clubes = await clubeService.listarClubes();
            return res.json(clubes);
        } catch (error) {
            next(error);
        }
    }
    async show(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const clube = await clubeService.buscarPorId(String(id));
            return res.json(clube);
        } catch (error) {
            next(error);
        }
    }


    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const atualizado = await clubeService.atualizarClube(String(id), req.body);
            return res.json(atualizado);
        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            await clubeService.deletarClube(String(id));
            return res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

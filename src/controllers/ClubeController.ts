import { Request, Response } from "express";
import { ClubeRepository } from "../repositories/ClubeRepository.js";
import { ClubeService } from "../services/ClubeService.js";

const clubeService = new ClubeService();

const repository = new ClubeRepository();

export class ClubeController {
    async store(req: Request, res: Response) {
        try {
            const { nome, brasao, cores_oficiais, responsavel, cnpj } = req.body;

            const novoClube = await repository.create({ nome, brasao, cores_oficiais, responsavel, cnpj });

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
            const clubes = await repository.findAll();
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
            return res.status(204).send(); // 204 significa Sucesso sem conteúdo de retorno
        } catch (error: any) { return res.status(400).json({ error: error.message }); }
    }
}

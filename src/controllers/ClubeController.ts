import { Request, Response } from "express";
import { ClubeRepository } from "../repositories/ClubeRepository.js";

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
}

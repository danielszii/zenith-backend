import { Request, Response, NextFunction } from 'express';
import { CampeonatoService } from '../services/CampeonatoService.js';

const campeonatoService = new CampeonatoService();

export class CampeonatoController {
    async store(req: Request, res: Response, next: NextFunction) {
        try {
            const novoCampeonato = await campeonatoService.criarCampeonato(req.body);
            return res.status(201).json(novoCampeonato);
        } catch (error) {
            next(error);
        }
    }

    async index(req: Request, res: Response, next: NextFunction) {
        try {
            const campeonatos = await campeonatoService.listarCampeonatos();
            return res.json(campeonatos);
        } catch (error) {
            next(error);
        }
    }

    async show(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const campeonato = await campeonatoService.buscarPorId(String(id));
            return res.json(campeonato);
        } catch (error) {
            next(error);
        }
    }
    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const atualizado = await campeonatoService.atualizarCampeonato(String(id), req.body);
            return res.json(atualizado);
        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            await campeonatoService.deletarCampeonato(String(id));
            return res.status(204).send(); // 204 significa Sucesso sem conteúdo de retorno
        } catch (error) {
            next(error);
        }
    }

    async inscreverClube(req: Request, res: Response, next: NextFunction) {
        try {
            const { id_campeonato, id_clube } = req.body;

            // Chama o service que vai rodar as travas de domínio e persistir no banco intermediário
            const novaInscricao = await campeonatoService.inscreverClube(String(id_campeonato), String(id_clube));
            return res.status(201).json(novaInscricao);

        } catch (error) {
            next(error); // Encaminha qualquer estouro de regra direto pro Middleware Global
        }
    }
}

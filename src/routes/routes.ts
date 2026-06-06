import { Router } from 'express';
import { AtletaController } from '../controllers/AtletaController.js';
import { ClubeController } from '../controllers/ClubeController.js';
import { CampeonatoController } from '../controllers/CampeonatoController.js';
import { PartidaController } from '../controllers/PartidaController.js';
import { EventoController } from '../controllers/EventoController.js';

import { validationMiddleware } from '../middlewares/validation.middleware.js';
import { CreateClubeDTO } from '../dtos/CreateClubeDTO.js';
import { CreateCampeonatoDTO } from '../dtos/CreateCampeonatoDTO.js'; 
import { CreateAtletaDTO } from '../dtos/CreateAtletaDTO.js';
import { CreatePartidaDTO } from '../dtos/CreatePartidaDTO.js';
import { CreateEventoSumulaDTO } from '../dtos/CreateEventoSumulaDTO.js';

const routes = Router();

const atletaController = new AtletaController();
const clubeController = new ClubeController();
const campeonatoController = new CampeonatoController();
const partidaController = new PartidaController();
const eventoController = new EventoController();

// ROTAS DE CLUBES
routes.post('/clubes', validationMiddleware(CreateClubeDTO), (req, res, next) => clubeController.store(req, res, next));
routes.get('/clubes', (req, res, next) => clubeController.index(req, res, next));
routes.put('/clubes/:id', (req, res, next) => clubeController.update(req, res, next));
routes.delete('/clubes/:id', (req, res, next) => clubeController.delete(req, res, next));
routes.get('/clubes/:id', (req, res, next) => clubeController.show(req, res, next));

// ROTAS DE CAMPEONATOS
routes.post('/campeonatos', validationMiddleware(CreateCampeonatoDTO), (req, res, next) => campeonatoController.store(req, res, next));
routes.get('/campeonatos', (req, res, next) => campeonatoController.index(req, res, next));
routes.put('/campeonatos/:id', (req, res, next) => campeonatoController.update(req, res, next));
routes.delete('/campeonatos/:id', (req, res, next) => campeonatoController.delete(req, res, next));
routes.get('/campeonatos/:id', (req, res, next) => campeonatoController.show(req, res, next));
routes.post('/campeonatos/inscricoes', (req, res, next) => campeonatoController.inscreverClube(req, res, next));

// ROTAS DE ATLETAS
routes.post('/atletas', validationMiddleware(CreateAtletaDTO), (req, res, next) => atletaController.store(req, res, next));
routes.get('/atletas', (req, res, next) => atletaController.index(req, res, next));
routes.put('/atletas/:id', (req, res, next) => atletaController.update(req, res, next));
routes.delete('/atletas/:id', (req, res, next) => atletaController.delete(req, res, next));
routes.get('/atletas/:id', (req, res, next) => atletaController.show(req, res, next));

// ROTAS DE PARTIDAS
routes.post('/partidas', validationMiddleware(CreatePartidaDTO), (req, res, next) => partidaController.store(req, res, next));
routes.get('/partidas', (req, res, next) => partidaController.index(req, res, next));
routes.get('/partidas/:id', (req, res, next) => partidaController.show(req, res, next));
routes.patch('/partidas/:id/status', (req, res, next) => partidaController.updateStatus(req, res, next));

// ROTAS DA SÚMULA E EVENTOS
routes.get('/partidas/:id/sumula', (req, res, next) => partidaController.showSumula(req, res, next));
routes.post('/eventos', validationMiddleware(CreateEventoSumulaDTO), (req, res, next) => eventoController.store(req, res, next));

export default routes;
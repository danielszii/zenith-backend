import { Router } from 'express';
import { AtletaController } from '../controllers/AtletaController.js';
import { ClubeController } from '../controllers/ClubeController.js';
import { CampeonatoController } from '../controllers/CampeonatoController.js'; // Adicionado
import { PartidaController } from '../controllers/PartidaController.js';
import { EventoSumulaController } from '../controllers/EventoSumulaController.js';


// Importa o middleware e os DTOs com validação
import { validationMiddleware } from '../middlewares/validation.middleware.js';
import { CreateClubeDTO } from '../dtos/CreateClubeDTO.js';
import { CreateCampeonatoDTO } from '../dtos/CreateCampeonatoDTO.js'; 
import { CreateAtletaDTO } from '../dtos/CreateAtletaDTO.js';
import { CreatePartidaDTO } from '../dtos/CreatePartidaDTO.js';
import { CreateEventoSumulaDTO } from '../dtos/CreateEventoSumulaDTO.js';

const routes = Router();

const atletaController = new AtletaController();
const clubeController = new ClubeController();
const campeonatoController = new CampeonatoController(); // Adicionado
const partidaController = new PartidaController();
const eventoController = new EventoSumulaController();


// ROTAS DE CLUBES
routes.post('/clubes', validationMiddleware(CreateClubeDTO), (req, res) => clubeController.store(req, res));
routes.get('/clubes', (req, res) => clubeController.index(req, res));
routes.put('/clubes/:id', (req, res) => clubeController.update(req, res));
routes.delete('/clubes/:id', (req, res) => clubeController.delete(req, res));
routes.get('/clubes/:id', (req, res) => clubeController.show(req, res));


// ROTAS DE CAMPEONATOS
routes.post('/campeonatos', validationMiddleware(CreateCampeonatoDTO), (req, res) => campeonatoController.store(req, res));
routes.get('/campeonatos', (req, res) => campeonatoController.index(req, res)); // lista todos
routes.put('/campeonatos/:id', (req, res) => campeonatoController.update(req, res));
routes.delete('/campeonatos/:id', (req, res) => campeonatoController.delete(req, res));
routes.get('/campeonatos/:id', (req, res) => campeonatoController.show(req, res)); // busca por id

// ROTAS DE ATLETAS
routes.post('/atletas', validationMiddleware(CreateAtletaDTO), (req, res) => atletaController.store(req, res));
routes.get('/atletas', (req, res) => atletaController.index(req, res));
routes.put('/atletas/:id', (req, res) => atletaController.update(req, res));
routes.delete('/atletas/:id', (req, res) => atletaController.delete(req, res));
routes.get('/atletas/:id', (req, res) => atletaController.show(req, res));

// ROTAS DE PARTIDAS
routes.post('/partidas', validationMiddleware(CreatePartidaDTO), (req, res) => partidaController.store(req, res));
routes.get('/partidas', (req, res) => partidaController.index(req, res));
routes.get('/partidas/:id', (req, res) => partidaController.show(req, res));
routes.patch('/partidas/:id/status', (req, res) => partidaController.updateStatus(req, res));

// ROTAS DE EVENTOS DE SÚMULA
routes.post('/partidas/:id_partida/eventos', validationMiddleware(CreateEventoSumulaDTO), (req, res) => eventoController.store(req, res));
routes.get('/partidas/:id_partida/eventos', (req, res) => eventoController.index(req, res));

export default routes;
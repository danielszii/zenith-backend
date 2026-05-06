import { Router } from 'express';
import { AtletaController } from '../controllers/AtletaController.js';
import { ClubeController } from '../controllers/ClubeController.js';

// 1. Inicializa o roteador
const routes = Router();

// 2. Instancia o controller (que contém a lógica do seu DER)   
const atletaController = new AtletaController();
const clubeController = new ClubeController();

// 3. Define os endpoints
routes.post('/atletas', (req, res) => atletaController.store(req, res));
routes.get('/atletas', (req, res) => atletaController.index(req, res));


routes.post('/clubes', (req, res) => clubeController.store(req, res));
routes.get('/clubes', (req, res) => clubeController.index(req, res));

export default routes;
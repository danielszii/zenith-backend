import { Router } from 'express';
import { AtletaController } from '../controllers/AtletaController.js';

// 1. Inicializa o roteador
const routes = Router();

// 2. Instancia o controller (que contém a lógica do seu DER)   
const atletaController = new AtletaController();

// 3. Define os endpoints
routes.post('/atletas', (req, res) => atletaController.store(req, res));

routes.get('/atlestas', (req, res) => atletaController.index(req, res));

export default routes;
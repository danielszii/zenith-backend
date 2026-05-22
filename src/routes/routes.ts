import { Router } from 'express';
import { AtletaController } from '../controllers/AtletaController.js';
import { ClubeController } from '../controllers/ClubeController.js';
import { CampeonatoController } from '../controllers/CampeonatoController.js'; // Adicionado

// Importa o middleware e os DTOs com validação
import { validationMiddleware } from '../middlewares/validation.middleware.js';
import { CreateClubeDTO } from '../dtos/CreateClubeDTO.js';
import { CreateCampeonatoDTO } from '../dtos/CreateCampeonatoDTO.js'; 
import { CreateAtletaDTO } from '../dtos/CreateAtletaDTO.js';

const routes = Router();

const atletaController = new AtletaController();
const clubeController = new ClubeController();
const campeonatoController = new CampeonatoController(); // Adicionado

// Endpoints de Clubes (Validando com DTO)
routes.post('/clubes', validationMiddleware(CreateClubeDTO), (req, res) => clubeController.store(req, res));
routes.get('/clubes', (req, res) => clubeController.index(req, res));

// Endpoints de Campeonatos (Validando com DTO)
routes.post('/campeonatos', validationMiddleware(CreateCampeonatoDTO), (req, res) => campeonatoController.store(req, res));
routes.get('/campeonatos', (req, res) => campeonatoController.index(req, res));

// Endpoints de Atletas (Validando com DTO)
routes.post('/atletas', validationMiddleware(CreateAtletaDTO), (req, res) => atletaController.store(req, res));
routes.get('/atletas', (req, res) => atletaController.index(req, res));

// ... suas outras importações (Express, Controllers, DTOs, etc)

// ==========================================
// ROTAS DE CAMPEONATOS
// ==========================================

// 1. Criar um novo campeonato (Protegido pelo DTO)
routes.post('/campeonatos', validationMiddleware(CreateCampeonatoDTO), (req, res) => campeonatoController.store(req, res));

// 2. Listar todos os campeonatos (Para alimentar a Home)
routes.get('/campeonatos', (req, res) => campeonatoController.index(req, res));

// 3. Buscar os detalhes de um campeonato específico pelo ID
routes.get('/campeonatos/:id', (req, res) => campeonatoController.show(req, res));

export default routes;
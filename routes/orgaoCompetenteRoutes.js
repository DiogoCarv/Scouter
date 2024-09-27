import express from 'express';
const router = express.Router();
import { atualizarStatus } from '../controllers/orgaoCompetenteController.js';
import { authMiddleware, isOrgaoCompetente } from '../middleware/auth.js'; // Middleware de autenticação

// Protegendo a rota de atualização de status (somente órgãos competentes)
router.post('/atualizar-status-problema', authMiddleware, isOrgaoCompetente, atualizarStatus); 

export default router;

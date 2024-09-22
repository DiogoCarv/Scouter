import express from 'express';
const router = express.Router();
import { atualizarStatus, autenticar } from '../controllers/orgaoCompetenteController';
import { authMiddleware, isOrgaoCompetente } from '../middleware/auth'; // Middleware de autenticação

// Protegendo a rota de atualização de status (somente órgãos competentes)
router.post('/atualizar-status', authMiddleware, isOrgaoCompetente, atualizarStatus); 

// Rota pública para autenticação
router.post('/autenticar', autenticar);

export default router;

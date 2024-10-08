import express from 'express';
const router = express.Router();
import { authMiddleware } from '../middleware/auth.js'; // Middleware de autenticação
import {criarProblema , listarProblemas, } from '../controllers/problemaController.js'

// Protegendo as rotas de morado
router.post('/registrar-problema', authMiddleware, criarProblema);  

export default router;

import express from 'express';
const router = express.Router();
import { autenticar , register } from '../controllers/moradorController.js';
import { authMiddleware } from '../middleware/auth.js'; // Middleware de autenticação
import {criarProblema , listarProblemas, } from '../controllers/problemaController.js'

// Protegendo as rotas de morador
router.post('/', register);
router.post('/registrar-problema', authMiddleware, criarProblema);  
router.get('/verificar-problema', authMiddleware, listarProblemas);   // Somente moradores autenticados podem verificar seus problemas
router.post('/autenticar', autenticar);

export default router;

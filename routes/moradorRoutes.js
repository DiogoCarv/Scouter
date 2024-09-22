import express from 'express';
const router = express.Router();
import { registrarProblema, verificarProblema, autenticar } from '../controllers/moradorController';
import { authMiddleware } from '../middleware/auth'; // Middleware de autenticação

// Protegendo as rotas de morador
router.post('/registrar-problema', authMiddleware, registrarProblema);  // Moradores precisam estar autenticados
router.get('/verificar-problema', authMiddleware, verificarProblema);   // Somente moradores autenticados podem verificar seus problemas

// Rota pública para autenticação
router.post('/autenticar', autenticar);

export default router;

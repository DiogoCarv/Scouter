import express from 'express';
const router = express.Router();
import { registrarProblema, verificarProblema, autenticar , register } from '../controllers/moradorController.js';
import { authMiddleware } from '../middleware/auth.js'; // Middleware de autenticação

// Protegendo as rotas de morador
router.post('/registrar-problema', authMiddleware, registrarProblema);  // Moradores precisam estar autenticados
router.get('/verificar-problema', authMiddleware, verificarProblema);   // Somente moradores autenticados podem verificar seus problemas
router.post('/', register);
// Rota pública para autenticação
router.post('/autenticar', autenticar);

export default router;

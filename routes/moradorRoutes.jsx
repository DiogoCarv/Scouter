import express from 'express';
const router = express.Router();
import { registrarProblema, verificarProblema, autenticar , register } from '../controllers/moradorController.jsx';
import { authMiddleware } from '../middleware/auth.jsx'; // Middleware de autenticação

// Protegendo as rotas de morador
router.post('/', register);
router.post('/registrar-problema', authMiddleware, registrarProblema);  
router.get('/verificar-problema', authMiddleware, verificarProblema);   // Somente moradores autenticados podem verificar seus problemas

router.post('/autenticar', autenticar);

export default router;

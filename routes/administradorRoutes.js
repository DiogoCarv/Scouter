import express from 'express';
const router = express.Router();

import { gerenciarUsuarios, gerenciarProblemas } from '../controllers/administradorController.js';

router.post('/gerenciar-usuarios', gerenciarUsuarios);
router.post('/gerenciar-problemas', gerenciarProblemas);

export default router;

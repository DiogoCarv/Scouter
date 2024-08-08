const express = require('express');
const router = express.Router();

import { gerenciarUsuarios, gerenciarProblemas } from '../controllers/administradorController';

router.post('/gerenciar-usuarios', gerenciarUsuarios);
router.post('/gerenciar-problemas', gerenciarProblemas);

export default router;

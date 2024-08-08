import express from 'express';
import router from express.Router();
import { gerenciarUsuarios, gerenciarProblemas } from '../controllers/administradorController';

router.post('/gerenciar-usuarios', gerenciarUsuarios);
router.post('/gerenciar-problemas', gerenciarProblemas);

module.exports = router;

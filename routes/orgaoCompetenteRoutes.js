import express from 'express';
const router = express.Router();

import { atualizarStatus, autenticar } from '../controllers/orgaoCompetenteController';

router.post('/atualizar-status', atualizarStatus);
router.post('/autenticar', autenticar);

export default router;

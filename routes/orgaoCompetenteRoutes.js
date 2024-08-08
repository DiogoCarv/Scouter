import express from 'express';
import router from  express.Router();
import { atualizarStatus, autenticar } from '../controllers/orgaoCompetenteController';

router.post('/atualizar-status', atualizarStatus);
router.post('/autenticar', autenticar);

module.exports = router;

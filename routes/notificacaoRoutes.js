import express from 'express';
import router from express.Router();
import { enviar } from '../controllers/notificacaoController';

router.post('/enviar', enviar);

export default router;
  
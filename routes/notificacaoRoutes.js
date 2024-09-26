import express from 'express';
const router = express.Router();
import { enviar } from '../controllers/notificacaoController.js';

router.post('/enviar', enviar);
router.get('/listar', listarNotificacoes);
export default router;
  


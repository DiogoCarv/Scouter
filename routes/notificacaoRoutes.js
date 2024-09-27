import express from 'express';
const router = express.Router();
import { enviar, listarNotificacoes } from '../controllers/notificacaoController.js';

router.post('/enviar-notificacao', enviar);
router.get('/listar-notificacao', listarNotificacoes);
export default router;
  


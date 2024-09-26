import express from 'express';
const router = express.Router();
import { enviar } from '../controllers/notificacaoController.jsx';

router.post('/enviar', enviar);
router.get('/listar', listarNotificacoes);
export default router;
  


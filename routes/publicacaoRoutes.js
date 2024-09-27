import express from 'express';
const router = express.Router();
import { criarPublicacao, listarPublicacoes } from '../controllers/publicacaoController.js';

router.post('/criar-publicacao', criarPublicacao);
router.get('/listar-publicacao', listarPublicacoes);

export default router;

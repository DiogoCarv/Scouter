const express = require('express');
const router = express.Router();
import { criarPublicacao, listarPublicacoes } from '../controllers/publicacaoController';

router.post('/publicacao', criarPublicacao);
router.get('/publicacao', listarPublicacoes);

export default router;

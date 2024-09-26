import express from 'express';
const router = express.Router();
import { criarPublicacao, listarPublicacoes } from '../controllers/publicacaoController.jsx';

router.post('/publicacao', criarPublicacao);
router.get('/publicacao', listarPublicacoes);

export default router;

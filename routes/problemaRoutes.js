import express from 'express';
const router = express.Router();


import { listarProblemas, obterProblema, criarProblema, atualizarProblema, excluirProblema } from '../controllers/problemaController.js';

router.get('/listar-problemas', listarProblemas);
router.get('/obter-problemas', obterProblema);
router.post('/criar-problemas', criarProblema);
router.put('/atualizar-problemas', atualizarProblema);
router.delete('/excluir-problemas', excluirProblema);
export default router;

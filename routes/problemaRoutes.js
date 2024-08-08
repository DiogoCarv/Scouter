import express from 'express';
const router = express.Router();


import { listarProblemas, obterProblema, criarProblema, atualizarProblema, excluirProblema } from '../controllers/problemaController';

router.get('/', listarProblemas);
router.get('/:id', obterProblema);
router.post('/', criarProblema);
router.put('/:id', atualizarProblema);
router.delete('/:id', excluirProblema);
export default router;

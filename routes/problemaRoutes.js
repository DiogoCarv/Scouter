import express from 'express';
import router from  express.Router();
import { listarProblemas, obterProblema, criarProblema, atualizarProblema, excluirProblema } from '../controllers/problemaController';

router.get('/', listarProblemas);
router.get('/:id', obterProblema);
router.post('/', criarProblema);
router.put('/:id', atualizarProblema);
router.delete('/:id', excluirProblema);

module.exports = router;

const express = require('express');
const router = express.Router();
const { listarProblemas, obterProblema, criarProblema, atualizarProblema, excluirProblema } = require('../controllers/problemaController');

router.get('/', listarProblemas);
router.get('/:id', obterProblema);
router.post('/', criarProblema);
router.put('/:id', atualizarProblema);
router.delete('/:id', excluirProblema);

module.exports = router;

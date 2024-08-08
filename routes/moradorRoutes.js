
import express from 'express';

import router  from express.Router();
import { registrarProblema, verificarProblema, autenticar } from '../controllers/moradorController' ;

router.post('/registrar-problema', registrarProblema);
router.get('/verificar-problema', verificarProblema);
router.post('/autenticar', autenticar);

module.exports = router;

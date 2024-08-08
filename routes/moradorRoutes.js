
import express from 'express';
const router = express.Router();

import { registrarProblema, verificarProblema, autenticar } from '../controllers/moradorController' ;

router.post('/registrar-problema', registrarProblema);
router.get('/verificar-problema', verificarProblema);
router.post('/autenticar', autenticar);

export default router;

import express from 'express';
import {listarProblemas} from '../controllers/problemaController.js';
import {criarOrgao} from '../controllers/orgaoCompetenteController.js';
const router = express.Router();


router.post('/criar-orgao', criarOrgao);
router.get('/listar-problemas-orgao',listarProblemas);

export default router;

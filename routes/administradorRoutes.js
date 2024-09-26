import express from 'express';
import CriarOrgao from '../src/components/CriarOrgao';
import {listarProblemas} from '../controllers/problemaController';
const router = express.Router();


router.post('/gerenciar-usuarios', CriarOrgao);
router.post('/gerenciar-problemas', listarProblemas);

export default router;

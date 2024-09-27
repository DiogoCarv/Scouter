import express from 'express';
import {criarOrgao} from '../controllers/orgaoCompetenteController.js';
const router = express.Router();


router.post('/criar-orgao', criarOrgao);

export default router;

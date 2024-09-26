import express from'express';
const router = express.Router();
import { login, register, problema } from '../controllers/authController.js';  


// Rota para login
router.post('/login', login);

// Rota para registro
router.post('/register', register);
router.post('/principal', problema);

router.post

export default router;




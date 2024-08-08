import express from'express';
import router from express.Router();
import { login, register } from '../controllers/authController';

// Rota para login
router.post('/login', login);

// Rota para registro
router.post('/register', register);

export default router;

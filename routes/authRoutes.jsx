import express from'express';
const router = express.Router();
import { login, register } from '../controllers/authController.jsx';  


// Rota para login
router.post('/login', login);

// Rota para registro
router.post('/register', register);

export default router;




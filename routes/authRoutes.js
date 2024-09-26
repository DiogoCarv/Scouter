import express from'express';
const router = express.Router();
import { login, register} from '../controllers/authController.js';  


// Rota para login
router.post('/login', login);

// Rota para registro
router.post('/register', register);


router.post

export default router;




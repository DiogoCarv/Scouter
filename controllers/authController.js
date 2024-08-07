import bcrypt from 'bcrypt ';
import jwt from 'jsonwebtoken ';
import User from '../models/User '; 

// Controlador de login
export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(400).json({ message: 'Usuário não encontrado' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Senha incorreta' });
        }

        const token = jwt.sign({ id: user.id }, 'seuSegredoJWT', { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro no servidor' });
    }
};

// Controlador de registro
export const register = async (req, res) => {
    const { username, password, address } = req.body;

    try {
        const userExists = await User.findOne({ where: { username } });

        if (userExists) {
            return res.status(400).json({ message: 'Usuário já existe' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            password: hashedPassword,
            address
        });

        const token = jwt.sign({ id: newUser.id }, 'seuSegredoJWT', { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro no servidor' });
    }
};

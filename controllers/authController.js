import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Admin from '../models/Administrador';
import Morador from '../models/Morador';
import OrgaoCompetente from '../models/OrgaoCompetente';

// Controlador de login
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await Admin.findOne({ where: { email } });
        let userType = 'administrador';

        // Se não encontrar na tabela de admin, procura em morador
        if (!user) {
            user = await Morador.findOne({ where: { email } });
            userType = 'morador';
        }

        // Se não encontrar em morador, procura em órgão competente
        if (!user) {
            user = await OrgaoCompetente.findOne({ where: { email } });
            userType = 'orgaoCompetente';
        }

        // Se o usuário não for encontrado em nenhuma tabela
        if (!user) {
            return res.status(400).json({ message: 'Usuário não encontrado' });
        }

        const isMatch = await bcrypt.compare(password, user.senha); // Altere 'user.password' para 'user.senha'

        if (!isMatch) {
            return res.status(400).json({ message: 'Senha incorreta' });
        }

        const token = jwt.sign({ id: user.id, userType }, 'seuSegredoJWT', { expiresIn: '1h' });

        // Retorna o token junto com o tipo de usuário
        res.json({ token, userType });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro no servidor' });
    }
};

// Controlador de registro para cada tipo de usuário
export const register = async (req, res) => {
    const { email, password, nome } = req.body;  // Aplique essas mudanças conforme o frontend

    try {
        let userExists = await Morador.findOne({ where: { email } });

        if (userExists) {
            return res.status(400).json({ message: 'Usuário já existe' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Cria o novo morador
        const newUser = await Morador.create({ email, senha: hashedPassword, nome: nome || 'Morador' }); // Nome opcional

        const token = jwt.sign({ id: newUser.id, tipo: 'morador' }, 'seuSegredoJWT', { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro no servidor' });
    }
};


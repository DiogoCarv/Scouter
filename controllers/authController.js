import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Admin from '../models/Administrador';
import Morador from '../models/Morador';
import OrgaoCompetente from '../models/OrgaoCompetente';

// Controlador de login
export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        let user = await Admin.findOne({ where: { username } });
        let userType = 'administrador';

        // Se não encontrar na tabela de admin, procura em morador
        if (!user) {
            user = await Morador.findOne({ where: { username } });
            userType = 'morador';
        }

        // Se não encontrar em morador, procura em órgão competente
        if (!user) {
            user = await OrgaoCompetente.findOne({ where: { username } });
            userType = 'orgaoCompetente';
        }

        // Se o usuário não for encontrado em nenhuma tabela
        if (!user) {
            return res.status(400).json({ message: 'Usuário não encontrado' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

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
    const { username, password, address, tipo } = req.body;

    try {
        let userExists;

        // Verifica em cada tabela se o usuário já existe
        if (tipo === 'administrador') {
            userExists = await Admin.findOne({ where: { username } });
        } else if (tipo === 'morador') {
            userExists = await Morador.findOne({ where: { username } });
        } else if (tipo === 'orgaoCompetente') {
            userExists = await OrgaoCompetente.findOne({ where: { username } });
        }

        if (userExists) {
            return res.status(400).json({ message: 'Usuário já existe' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Cria o novo usuário na tabela correta
        let newUser;
        if (tipo === 'administrador') {
            newUser = await Admin.create({ username, password: hashedPassword, address });
        } else if (tipo === 'morador') {
            newUser = await Morador.create({ username, password: hashedPassword, address });
        } else if (tipo === 'orgaoCompetente') {
            newUser = await OrgaoCompetente.create({ username, password: hashedPassword, address });
        }

        const token = jwt.sign({ id: newUser.id, tipo }, 'seuSegredoJWT', { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro no servidor' });
    }
};

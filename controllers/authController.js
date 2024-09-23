import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Admin from '../models/Administrador.js';
import Morador from '../models/Morador.js';
import OrgaoCompetente from '../models/OrgaoCompetente.js';

// Controlador de login
export const login = async (req, res) => {
    const { email, password } = req.body;
    console.log('Dados recebidos no registro:', req.body);  
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

        const isMatch = await bcrypt.compare(password, user.senha); 

        if (!isMatch) {
            return res.status(400).json({ message: 'Senha incorreta' });
        }

        const token = jwt.sign({ id: user.id, userType }, 'seuSegredoJWT', { expiresIn: '1h' });

        // Retorna o token junto com o tipo de usuário
        res.json({ token, userType });
        console.log('Dados recebidos no registro:', req.body);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro no servidor' });
    }
};

// Controlador de registro para cada tipo de usuário
export const register = async (req, res) => {
    const { email, password, nome, tipo } = req.body;  
    console.log('Dados recebidos no registro:', req.body);  
    try {
        
        let userExists;

        // Verifica se o usuário já existe na tabela correta
        if (tipo === 'administrador') {
            userExists = await Admin.findOne({ where: { email } });
        } else if (tipo === 'morador') {
            userExists = await Morador.findOne({ where: { email } });
        } else if (tipo === 'orgaoCompetente') {
            userExists = await OrgaoCompetente.findOne({ where: { email } });
        }

        if (userExists) {
            return res.status(400).json({ message: 'Usuário já existe' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        let newUser;
        if (tipo === 'administrador') {
            newUser = await Admin.create({ email, senha: hashedPassword, nome });
        } else if (tipo === 'morador') {
            newUser = await Morador.create({ email, senha: hashedPassword, nome });
        } else if (tipo === 'orgaoCompetente') {
            newUser = await OrgaoCompetente.create({ email, senha: hashedPassword, nome });
        }

        const token = jwt.sign({ id: newUser.id, tipo }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ token, message: 'Usuário registrado com sucesso' });
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);  
        res.status(500).json({ message: 'Erro no servidor' });
    }
};


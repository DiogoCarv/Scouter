import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Admin from '../models/Administrador.js';
import Morador from '../models/Morador.js';
import OrgaoCompetente from '../models/OrgaoCompetente.js';

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
    const { email, password, nome } = req.body;

    try {
        console.log('Dados recebidos no registro:', req.body);  // Verifica se os dados chegaram no backend
        console.log('JWT_SECRET:', process.env.JWT_SECRET);  // Adicione isso no começo do controlador

        let userExists = await Morador.findOne({ where: { email } });

        if (userExists) {
            console.log('Usuário já existe:', email);
            return res.status(400).json({ message: 'Usuário já existe' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Senha criptografada:', hashedPassword);

        // Tenta criar o morador no banco
        const newUser = await Morador.create({ email, senha: hashedPassword, nome: nome || 'morador' });
        console.log('Novo morador criado:', newUser);

        const token = jwt.sign({ id: newUser.id, tipo: 'morador' }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error('Erro ao registrar morador:', error);  // Exibe qualquer erro que acontecer
        res.status(500).json({ message: 'Erro no servidor' });
    }
};

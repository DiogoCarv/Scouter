import jwt from 'jsonwebtoken';

// Middleware de autenticação (Verifica se o token JWT é válido)
export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido. Acesso negado.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Anexa os dados do usuário decodificado ao request
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token inválido. Acesso negado.' });
  }
};

// Verifica se o usuário é um órgão competente
export const isOrgaoCompetente = (req, res, next) => {
  if (req.user.userType !== 'orgaoCompetente') {  // Corrigir para 'orgaoCompetente'
    return res.status(403).json({ message: 'Acesso negado. Somente órgãos competentes podem acessar esta rota.' });
  }
  next();
};

// Verifica se o usuário é administrador
export const isAdmin = (req, res, next) => {
  if (req.user.userType !== 'administrador') {  // Corrigir para 'administrador'
    return res.status(403).json({ message: 'Acesso negado. Somente administradores podem acessar esta rota.' });
  }
  next();
};

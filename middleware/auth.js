

import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Acesso negado. Nenhum token fornecido.' });
  }

  try {
    const decoded = jwt.verify(token, 'seuSegredoJWT');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Token inválido.' });
  }
};

export default authMiddleware;

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key_local';

interface TokenPayload {
  id: string;
  role: 'admin' | 'mesario' | 'gestor';
}

// Estende a tipagem do Express para aceitar o usuário logado na requisição
declare global {
  namespace Express {
    interface Request {
      usuarioLogado?: TokenPayload;
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ status: 'error', message: 'Token de autenticação não fornecido.' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
    
    // Injeta o ID e a Role do usuário dentro do 'req' para o próximo middleware usar
    req.usuarioLogado = { id: decoded.id, role: decoded.role };
    
    return next();
  } catch (error) {
    return res.status(401).json({ status: 'error', message: 'Token de autenticação inválido ou expirado.' });
  }
};
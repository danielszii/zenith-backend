import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { AppError } from '../errors/AppError.js';

export const errorHandler: ErrorRequestHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Se o erro foi disparado intencionalmente
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      status: 'error',
      message: error.message
    });
    return;
  }

  // Se for um erro do PostgreSQL
  if ('code' in error) {
    const pgError = error as any;
    if (pgError.code === '23505') { // Código do Postgres para Registro Duplicado
      res.status(409).json({
        status: 'error',
        message: 'Conflito de dados: Este registro já existe no sistema.'
      });
      return;
    }
  }

  // Se for um erro totalmente inesperado
  console.error('Erro inesperado:', error);
  res.status(500).json({
    status: 'error',
    message: 'Erro interno do servidor ao processar a requisição.'
  });
};
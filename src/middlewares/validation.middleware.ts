import { Request, Response, NextFunction } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

export function validationMiddleware(type: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    // 1. Transforma o JSON bruto do body em uma instância da classe DTO
    const dtoInstance = plainToInstance(type, req.body);

    // 2. Executa as validações dos decorators (@IsString, @IsNotEmpty, etc)
    const errors: ValidationError[] = await validate(dtoInstance);

    if (errors.length > 0) {
      // Se houver erros, mapeia e devolve direto para o frontend
      const message = errors.map((error: ValidationError) => 
        Object.values(error.constraints || {})
      ).flat();
      
      return res.status(400).json({ errors: message });
    }

    // Se estiver tudo ok, joga o objeto validado no req.body e segue para o Controller
    req.body = dtoInstance;
    next();
  };
}
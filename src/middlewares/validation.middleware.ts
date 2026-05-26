import { Request, Response, NextFunction } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

export function validationMiddleware(type: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoInstance = plainToInstance(type, req.body);

    const errors: ValidationError[] = await validate(dtoInstance);

    if (errors.length > 0) {
      const message = errors.map((error: ValidationError) => 
        Object.values(error.constraints || {})
      ).flat();
      
      return res.status(400).json({ errors: message });
    }

    req.body = dtoInstance;
    next();
  };
}
// create-product.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CreateProductMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Aquí puedes agregar lógica para modificar o validar el cuerpo de la solicitud antes de llamar a next()
    console.log('Middleware aplicado antes de createProduct');
    next();
  }
}
import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';

export const parseObjectId = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const objectId = new Types.ObjectId(id);
    req.params.id = objectId.toHexString(); // Convertimos el ObjectId en una cadena de caracteres
    next();
  } catch (error) {
    return res.status(400).json({
      message: 'Invalid ObjectId',
    });
  }
}
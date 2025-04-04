declare global {
    namespace Express {
      interface Request {
        header: any;
        email: string
        password: string
      }
    }
  }

import { NextFunction,  Response, Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { ExtendedRequest } from '../shared';
import { has } from 'lodash';



const secretKey = '';

export const verifyToken = (req: Request, res: Response,  next: NextFunction): void => {
    const token = req.header('Authorization');
    if(!token) {
        res.status(401).json({error: 'Unauthorized'})
    }
    try {
        const decoded = jwt.verify(token, secretKey);
        if(has(decoded, 'userId')) {
            next();
        }
    } catch (error) {
        console.error('error', error);
        res.status(401).json({message: 'Invalid token'});
    }
}
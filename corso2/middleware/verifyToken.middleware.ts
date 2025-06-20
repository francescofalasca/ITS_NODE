import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import ErrorWithStatus from '../ErrorWithStatus.js';

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

const verifyToken = (req: Request, res: Response, next: NextFunction): void  => {
    try {
        const authHeader = req.headers['authorization'];

        if (!authHeader) {
            throw new ErrorWithStatus(401, 'Accesso negato');
        }

        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!);

        req.user = decoded;

        next();
    } catch (err) {
        throw new ErrorWithStatus(401, 'Accesso negato');
    }
};

export default verifyToken;
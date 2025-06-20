import { Request, Response, NextFunction } from 'express';
import ErrorWithStatus from "../ErrorWithStatus";

const errorMiddleware = (
    err: ErrorWithStatus,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    if (err.statusCode >= 400 && err.statusCode <= 499) {
        res.status(err.statusCode).json({ error: err.message });
    } else {
        console.error(err.stack);

        res.status(500).json({ error: 'Qualcosa è andato storto!' });
    }
};

export default errorMiddleware;
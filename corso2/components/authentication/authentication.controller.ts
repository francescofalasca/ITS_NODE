import ErrorWithStatus from '../../ErrorWithStatus.js';
import * as AuthenticationService from './authentication.service.js';
import z from 'zod';
import { Request, Response } from 'express';

export const signin = async (
    req: Request,
    res: Response
): Promise<void> => {
    const schema = z.object({
        body: z.object({
            email: z.string(),
            password: z.string()
        })
    });

    const isValidData = await schema.safeParseAsync({
        body: req.body
    });

    if (!isValidData.success) {
        console.error(isValidData.error.issues)
        throw new ErrorWithStatus(422, isValidData.error.issues[0].message);
    }

    const token = await AuthenticationService.signin(
        req.body.email,
        req.body.password
    );

    res.status(200).json({ token });
};
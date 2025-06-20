import ErrorWithStatus from '../../ErrorWithStatus';
import * as usersService from './users.service.js';
import z from 'zod';
import { Request, Response } from 'express';

export const getUserByID = async (
    req: Request,
    res: Response
): Promise<void> => {
    const schema = z.object({
        params: z.object({
            id: z.preprocess(val => Number(val), z.number().positive())
        })
    });

    const isValidData = await schema.safeParseAsync({
        params: req.params
    });

    if (!isValidData.success) {
        throw new ErrorWithStatus(422, isValidData.error.issues[0].message);
    }

    const user = await usersService.getUserByID(Number(req.params.id));

    res.status(200).json(user);
};

export const getUsers = async (
    req: Request,
    res: Response
): Promise<void> => {
    const users = await usersService.getUsers();

    res.status(200).json(users);
};

export const createUser = async (
    req: Request,
    res: Response
): Promise<void> => {
    const schema = z.object({
        body: z.object({
            name: z.string(),
            email: z.string().email(),
            password: z.string().min(8),
            age: z.number().positive().optional(),
            isActive: z.boolean()
        })
    });

    const isValidData = await schema.safeParseAsync({
        body: req.body
    });

    if (!isValidData.success) {
        console.error(isValidData.error.issues);
        throw new ErrorWithStatus(422, isValidData.error.issues[0].message);
    }

    const user = await usersService.createUser(req.body);

    res.status(201).json(user);
};

export const updateUser = async (
    req: Request,
    res: Response
): Promise<void> => {
    const schema = z.object({
        params: z.object({
            id: z.preprocess(val => Number(val), z.number().positive()),
        }),
        body: z.object({
            name: z.string(),
            email: z.string().email(),
            age: z.number().positive().optional(),
            isActive: z.boolean()
        })
    });

    const isValidData = await schema.safeParseAsync({
        params: req.params,
        body: req.body
    });

    if (!isValidData.success) {
        throw new ErrorWithStatus(422, isValidData.error.issues[0].message);
    }

    const user = await usersService.updateUser({
        ...req.body,
        id: Number(req.params.id)
    });

    res.status(200).json(user);
};

export const deleteUser =  async (
    req: Request,
    res: Response
): Promise<void> => {
    const schema = z.object({
        params: z.object({
            id: z.preprocess(val => Number(val), z.number().positive()),
        })
    });

    const isValidData = await schema.safeParseAsync({
        params: req.params
    });

    if (!isValidData.success) {
        throw new ErrorWithStatus(422, isValidData.error.issues[0].message);
    }

    const result = await usersService.deleteUser(Number(req.params.id));

    res.status(200).json(result);
};
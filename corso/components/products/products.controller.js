import ErrorWithStatus from '../../ErrorWithStatus.js';
import * as productsService from './products.service.js';
import z from 'zod';

export const getProductByID = async (req, res) => {
    const schema = z.object({
        params: z.object({
            id: z.preprocess(val => Number(val), z.number().positive())
        })
    });

    const isValidData = await schema.safeParseAsync({
        params: req.params
    });

    if (!isValidData.success) {
        throw new ErrorWithStatus(422, isValidData.error.issues);
    }

    const product = await productsService.getProductByID(Number(req.params.id));

    res.status(200).json(product);
};

export const getProducts = async (req, res) => {
    const products = await productsService.getProducts();

    res.status(200).json(products);
};

export const createProduct = async (req, res) => {
    const schema = z.object({
        body: z.object({
            name: z.string(),
            description: z.string(),
            price: z.number().nonnegative(),
            inStock: z.boolean()
        })
    });

    const isValidData = await schema.safeParseAsync({
        body: req.body
    });

    if (!isValidData.success) {
        throw new ErrorWithStatus(422, isValidData.error.issues);
    }

    const product = await productsService.createProduct(req.body);

    res.status(201).json(product);
};

export const updateProduct = async (req, res) => {
    const schema = z.object({
        params: z.object({
            id: z.preprocess(val => Number(val), z.number().positive()),
        }),
        body: z.object({
            name: z.string(),
            description: z.string(),
            price: z.number().nonnegative(),
            inStock: z.boolean()
        })
    });

    const isValidData = await schema.safeParseAsync({
        params: req.params,
        body: req.body
    });

    if (!isValidData.success) {
        throw new ErrorWithStatus(422, isValidData.error.issues);
    }

    const product = await productsService.updateProduct({
        ...req.body,
        id: Number(req.params.id)
    });

    res.status(200).json(product);
};

export const deleteProduct =  async (req, res) => {
    const schema = z.object({
        params: z.object({
            id: z.preprocess(val => Number(val), z.number().positive()),
        })
    });

    const isValidData = await schema.safeParseAsync({
        params: req.params
    });

    if (!isValidData.success) {
        throw new ErrorWithStatus(422, isValidData.error.issues);
    }

    const result = await productsService.deleteProduct(Number(req.params.id));

    res.status(200).json(result);
};
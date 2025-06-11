import * as productsService from './products.service.js';

export const getProductByID = (req, res) => {
    const product = productsService.getProductsByID(Number(req.params.id));

    res.status(200).json(product);
};

export const getProducts = (req, res) => {
    const products = productsService.getProducts();

    res.status(200).json(products);
};

export const createProduct = (req, res) => {
    const product = productsService.createProduct(req.body);

    res.status(201).json(product);
};

export const updateProduct = (req, res) => {
    const product = productsService.updateProduct({
        ...req.body,
        id: Number(req.params.id)
    });

    res.status(200).json(product);
};

export const deleteProduct = (req, res) => {
    const result = productsService.deleteProduct(Number(req.params.id));

    res.status(200).json(result);
};
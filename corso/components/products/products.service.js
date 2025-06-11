import * as productsData from './products.data.js';

export const getProductByID = id => {
    const product = productsData.getProductByID(id);

    return product;
};

export const getProducts = () => {
    const products = productsData.getProducts();

    return products;
};

export const createProduct = product => {
    const product1 = productsData.createProduct(product);

    return product1;
};

export const updateProduct = product => {
    const product1 = productsData.updateProduct(product);

    return product1;
};

export const deleteProduct = id => {
    const result = productsData.deleteProduct(id);

    return result;
};
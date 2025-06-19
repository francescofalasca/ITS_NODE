import ErrorWithStatus from '../../ErrorWithStatus.js';
import * as productsData from './products.data.js';

export const getProductByID = async id => {
    const product = await productsData.getProductByID(id);

    return product;
};

export const getProducts = async () => {
    const products = await productsData.getProducts();

    return products;
};

export const createProduct = async product => {
    const newProductID = await productsData.createProduct(product);

    return await getProductByID(newProductID);
};

export const updateProduct = async product => {
    await productsData.updateProduct(product);

    return await getProductByID(product.id);
};

export const deleteProduct = async id => {
    await productsData.deleteProduct(id);

    return true;
};
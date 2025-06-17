import ErrorWithStatus from '../../error_with_status.js';
import * as productsData from './products.data.js';

export const getProductByID = id => {
    const product = productsData.getProductByID(id);

    return product;
};

export const getProducts = () => {
    const products = productsData.getProducts();

    return products;
};

export const createProduct = async product => {
    const newProductID = productsData.createProduct(product);

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
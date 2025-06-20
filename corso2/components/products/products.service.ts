import { IProduct } from './IProduct';
import * as productsData from './products.data.js';

export const getProductByID = async (id: number): Promise<IProduct> => {
    const product = await productsData.getProductByID(id);

    return product;
};

export const getProducts = async (): Promise<IProduct[]> => {
    const products = await productsData.getProducts();

    return products;
};

export const createProduct = async (product: IProduct): Promise<IProduct> => {
    const newProductID = await productsData.createProduct(product);

    return await getProductByID(newProductID);
};

export const updateProduct = async (product: IProduct): Promise<IProduct> => {
    await productsData.updateProduct(product);

    return await getProductByID(product.id);
};

export const deleteProduct = async (id:number): Promise<boolean> => {
    await productsData.deleteProduct(id);

    return true;
};
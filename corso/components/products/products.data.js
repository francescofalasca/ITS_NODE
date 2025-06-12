import dbProducts from '../../database/product.js';
import ErrorWithStatus from '../../error_with_status.js';

export const getProductByID = id => {
    const product = dbProducts.find(p => p.id === id);

    if (!product) {
        throw new ErrorWithStatus(404, `Prodotto con id ${id} non trovato.`);
    }

    return product;
}

export const getProducts = () => {
    return dbProducts;
}

export const createProduct = product => {
    const maxID = dbProducts.length > 0 ? Math.max(...dbProducts.map(p => p.id)) : 0;

    const newProduct = {
        ...product,
        id: maxID + 1
    };

    dbProducts.push(newProduct);
    return newProduct;
}

export const updateProduct = product => {
    const index = dbProducts.findIndex(p => p.id === product.id);

    if (index === -1) {
        throw new ErrorWithStatus(404, `Prodotto con id ${product.id} non trovato.`);
    }

    dbProducts[index] = { ...product };
    return product;
}

export const deleteProduct = id => {
    const index = dbProducts.findIndex(p => p.id === id);

    if (index === -1) {
        throw new ErrorWithStatus(404, `Prodotto con id ${product.id} non trovato.`);
    }

    dbProducts.splice(index, 1);
    return true;
}
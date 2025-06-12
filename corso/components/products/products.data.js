import dbProducts from '../../database/product.js';

export const getProductByID = id => {
    const product = dbProducts.find(p => p.id === id);

    if (!product) {
        return null;
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
        // TODO: gestire errore
        return null;
    }

    dbProducts[index] = { ...product };
    return product;
}

export const deleteProduct = id => {
    const index = dbProducts.findIndex(p => p.id === id);

    if (index === -1) {
        // TODO: gestire errore
        return false;
    }

    dbProducts.splice(index, 1);
    return true;
}
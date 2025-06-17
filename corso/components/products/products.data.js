// import dbProducts from '../../database/product.js';
import poolPromise from '../../mssql.config.js';
import ErrorWithStatus from '../../error_with_status.js';

export const getProductByID = async id => {
    const pool = await poolPromise;

    const sql = `SELECT id
                    , name
                    , description
                    , price
                    , in_stock AS 'inStock'
                FROM products
                WHERE id = @id`;

    const queryResult = await pool.request().input("id", id).query(sql);

    const product = queryResult.recordset[0];

    if (!product) {
        throw new ErrorWithStatus(404, `Prodotto con id ${id} non trovato.`);
    }

    return product;
}

export const getProducts = async () => {
    const pool = await poolPromise;

    const sql = `SELECT id
                    , name
                    , description
                    , price
                    , in_stock AS 'inStock'
                 FROM products`;

    const queryResult = await pool.request().query(sql);

    return queryResult.recordset;
};

export const createProduct = async product => {
    const pool = await poolPromise;

    const sql = `INSERT INTO products (name, description, price, in_stock)
                 OUTPUT inserted.id
                 VALUES (@name, @description, @price, @in_stock)`;
    
    const queryResult = await pool
        .request()
        .input("name", product.name)
        .input("description", product.description)
        .input("price", product.price)
        .input("in_stock", product.inStock)
        .query(sql);

    return queryResult.recordset[0].id;
}

export const updateProduct = async product => {
    const pool = await poolPromise;

    const sql = `UPDATE products
                 SET name = @name
                 , description = @description
                 , price = @price
                 , in_stock = @in_stock
                 WHERE id = @id`;

    await pool
        .input("id", id)
        .input("name", product.name)
        .input("description", product.description)
        .input("price", product.price)
        .input("in_stock", product.inStock)
        .query(sql);
}

export const deleteProduct = async id => {
    const pool = await poolPromise;

    const sql = `DELETE FROM products
                 WHERE id = @id`;

    await pool.request().input("id", id).query(sql);
}
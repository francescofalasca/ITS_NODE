// import dbUsers from '../../database/user.js';
import poolPromise from '../config/mssql.config.js';
import ErrorWithStatus from '../../ErrorWithStatus.js';

export const getUserByID = async id => {
    const pool = await poolPromise;

    const sql = `SELECT id
                    , name
                    , email
                    , age
                    , is_active AS 'isActive'
                FROM users
                WHERE id = @id`;

    const queryResult = await pool.request().input("id", id).query(sql);

    const user = queryResult.recordset[0];

    if (!user) {
        throw new ErrorWithStatus(404, `Utente con id ${id} non trovato.`);
    }

    return user;
};

export const getUsers = async () => {
    const pool = await poolPromise;

    const sql = `SELECT id
                    , name
                    , email
                    , age
                    , is_active AS 'isActive'
                 FROM users`;

    const queryResult = await pool.request().query(sql);

    return queryResult.recordset;
};

export const createUser = async user => {
    const pool = await poolPromise;

    const sql = `INSERT INTO users (name, email, age, is_active)
                 OUTPUT inserted.id
                 VALUES (@name, @email, @age, @is_active)`;
    
    const queryResult = await pool
        .request()
        .input("name", user.name)
        .input("email", user.email)
        .input("age", user.age)
        .input("is_active", user.isActive)
        .query(sql);

    return queryResult.recordset[0].id;
};

export const updateUser = async user => {
    const pool = await poolPromise;

    const sql = `UPDATE users
                 SET name = @name
                 , email = @email
                 , age = @age
                 , is_active = @is_active
                 WHERE id = @id`;

    await pool
        .input("id", id)
        .input("name", user.name)
        .input("email", user.email)
        .input("age", user.age)
        .input("is_active", user.isActive)
        .query(sql);
};

export const deleteUser = async id => {
    const pool = await poolPromise;

    const sql = `DELETE FROM users
                 WHERE id = @id`;

    await pool.request().input("id", id).query(sql);
};
import ErrorWithStatus from '../../ErrorWithStatus.js';
import * as usersData from './users.data.js';
import bcrypt from 'bcryptjs';

export const getUserByID = async id => {
    const user = await usersData.getUserByID(id);

    return user;
};

export const getUserByEmail = async email => {
    const user = await usersData.getUserByEmail(email);

    return user;
};

export const getUsers = async () => {
    const users = await usersData.getUsers();

    return users;
};

export const createUser = async user => {
    const newUserID = await usersData.createUser({
        ...user,
        password: bcrypt.hashSync(user.password)
    });

    return await getUserByID(newUserID);
};

export const updateUser = async user => {
    await usersData.updateUser(user);

    return await getUserByID(user.id);
};

export const deleteUser = async id => {
    await usersData.deleteUser(id);

    return true;
};
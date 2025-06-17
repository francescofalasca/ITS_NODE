import ErrorWithStatus from '../../ErrorWithStatus.js';
import * as usersData from './users.data.js';

export const getUserByID = id => {
    const user = usersData.getUserByID(id);

    return user;
};

export const getUsers = () => {
    const users = usersData.getUsers();

    return users;
};

export const createUser = async user => {
    const newUserID = usersData.createUser(user);

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
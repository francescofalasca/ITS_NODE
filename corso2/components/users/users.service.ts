import * as usersData from './users.data.js';
import bcrypt from 'bcryptjs';
import { IUser } from "./IUser";

export const getUserByID = async (id: number): Promise<IUser> => {
    const user = await usersData.getUserByID(id);

    return user;
};

export const getUserByEmail = async (email: string): Promise<IUser> => {
    const user = await usersData.getUserByEmail(email);

    return user;
};

export const getUsers = async (): Promise<IUser[]> => {
    const users = await usersData.getUsers();

    return users;
};

export const createUser = async (user: IUser): Promise<IUser> => {
    const newUserID = await usersData.createUser({
        ...user,
        password: bcrypt.hashSync(user.password!)
    });

    return await getUserByID(newUserID);
};

export const updateUser = async (user: IUser): Promise<IUser> => {
    await usersData.updateUser({
        ...user,
        password: bcrypt.hashSync(user.password!)
    });

    return await getUserByID(user.id);
};

export const deleteUser = async (id: number): Promise<boolean> => {
    await usersData.deleteUser(id);

    return true;
};
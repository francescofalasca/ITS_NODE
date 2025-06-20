import ErrorWithStatus from "../../ErrorWithStatus.js";
import { getUserByEmail } from '../users/users.data.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signin = async (
    email: string,
    password: string
): Promise<string> => {
    const user = await getUserByEmail(email);
    const isPasswordCorrect = await bcrypt.compare(password, user.password!);

    if (!isPasswordCorrect) {
        throw new ErrorWithStatus(401, 'Password errata');
    }

    return jwt.sign(user, process.env.JWT_SECRET_KEY!, { expiresIn: '8h' });
};
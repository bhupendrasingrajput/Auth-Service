import { findUserByEmail } from '../services/user.service.js';
import { ApiError } from '../utils/ApiError.js';
import bcrypt from 'bcrypt';

export const loginForCRM = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) throw new ApiError(400, 'Bad Request, Email & Password Required!');

        const user = await findUserByEmail(email);

        const isMatched = await bcrypt.compare(user.password, password);
        if (!isMatched) throw new ApiError(404, 'Wrong Password!');

        res.json({ success: true, user });
    } catch (error) {
        next(error);
    }
}
import { validatePassword } from '../services/password.service.js';
import { generateToken } from '../services/token.service.js';
import { findUserByEmail } from '../services/user.service.js';
import { ApiError } from '../utils/ApiError.js';

export const dashboardLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) throw new ApiError(400, 'Email and Password are required!');

        const user = await findUserByEmail(email);

        if (!user) throw new ApiError(404, 'User is not registered!');

        if (!user?.accesses?.['dashboard']) {
            throw new ApiError(400, 'Dashboard is not accessible for you, contact admin!');
        }

        const isValidPassword = await validatePassword(password, user.password, next);

        if (!isValidPassword) throw new ApiError(402, 'Wrong Password!');

        delete user.password;

        const accessToken = generateToken(user, 'access');
        const refreshToken = generateToken(user, 'refresh');

        return res.status(200).json({
            message: "Login Successfull!",
            token: accessToken,
            user,
        });
    } catch (error) {
        next(error);
    }
};
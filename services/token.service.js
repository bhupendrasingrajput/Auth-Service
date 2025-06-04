import jwt from 'jsonwebtoken';
import config from '../config/index.js';
import { ApiError } from '../utils/ApiError.js';

const { accessTokenSecret, accessTokenExpiry = '15m', refreshTokenSecret, refreshTokenExpiry = '7d' } = config.jwt;

export const generateToken = (payload, type = 'access') => {
    const secret = type === 'access' ? accessTokenSecret : refreshTokenSecret;
    const expiresIn = type === 'access' ? accessTokenExpiry : refreshTokenExpiry;

    return jwt.sign(payload, secret, { expiresIn });
};

export const verifyToken = async (req, res, next) => {
    try {
        const { token } = req.body;

        if (!token || !service) throw new ApiError(400, "Bad Request, token & service required!");

        const payload = jwt.verify(token, accessTokenSecret);

        return res.json({ user: payload })
    } catch (error) {
        next(error)
    }
}
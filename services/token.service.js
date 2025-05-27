import jwt from 'jsonwebtoken';
import config from '../config/index.js';

const { accessTokenSecret, accessTokenExpiry = '15m', refreshTokenSecret, refreshTokenExpiry = '7d' } = config.jwt;

export const generateToken = (payload, type = 'access') => {
    const secret = type === 'access' ? accessTokenSecret : refreshTokenSecret;
    const expiresIn = type === 'access' ? accessTokenExpiry : refreshTokenExpiry;

    return jwt.sign(payload, secret, { expiresIn });
};

export const validateToken = () => {

}

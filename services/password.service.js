import config from "../config/index.js";
import bcrypt from 'bcrypt';

export const encryptPassword = async (password, next) => {
    try {
    } catch (error) {
        next(error);
    }
}

export const validatePassword = async (password, hashedPassword, next) => {
    try {
        return bcrypt.compare(password, hashedPassword);
    } catch (error) {
        next(error);
    }
}
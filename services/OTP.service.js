import { generateOTP } from '../utils/helpers.js';
import redis from '../config/redis.js';

const OTP_EXPIRY = 300;

export const generateAndStoreOtp = async (email) => {
    const otp = generateOTP();
    await redis.set(`otp:${email}`, otp, 'EX', OTP_EXPIRY);
    return otp;
};


export const verifyOtp = async (email, otp) => {
    const storedOtp = await redis.get(`otp:${email}`);
    if (!storedOtp) return 'not_found';
    if (storedOtp !== otp) return 'invalid';
    await redis.del(`otp:${email}`);
    return 'valid';
};

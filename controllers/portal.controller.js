import { ApiError } from '../utils/ApiError.js';
import { createUser, findUserByEmail } from '../services/user.service.js';
import { generateAndStoreOtp, verifyOtp } from '../services/OTP.service.js';
import { generateToken } from '../services/token.service.js';

export const sendOTP = async (req, res, next) => {
    try {
        console.log('Sending OTP...');
        const { email } = req.body;
        if (!email) throw new ApiError(400, "Please provide an email.");

        const user = await findUserByEmail(email);

        const otp = await generateAndStoreOtp(email);

        const message = user ? `Hello ${user.name}, your OTP is ${otp}` : `Your OTP is ${otp}`;

        return res.status(200).json({ message, otp });
    } catch (error) {
        next(error);
    }
}

export const verifyOTP = async (req, res, next) => {
    try {
        const { email, otp } = req.body;

        const result = await verifyOtp(email, otp);

        if (result === 'not_found') throw new ApiError(410, "OTP has expired or was never requested.");

        if (result === 'invalid') throw new ApiError(401, "Invalid OTP.");

        let user = await findUserByEmail(email);

        if (!user) {
            const data = { email, service: 'portal' };
            user = await createUser(data);

            if (!user) {
                throw new ApiError(500, "Failed To Register User.");
            }
        }

        const accessToken = generateToken(user, 'access');
        const refreshToken = generateToken(user, 'refresh');

        return res.status(200).json({
            message: "OTP verified successfully.",
            token: accessToken,
            user,
        });
    } catch (error) {
        next(error);
    }
};
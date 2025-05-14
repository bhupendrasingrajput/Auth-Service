import express from 'express';
import { sendOTP, verifyOTP } from '../controllers/auth.controller.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({
        pid: process.pid,
        status: 'active',
        message: 'Auth Service is running.',
        timestamp: new Date().toISOString()
    });
});

router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTP);

export default router;
    
import express from 'express';
import crmRoutes from './crm.routes.js';
import dashboardRoutes from './dashboard.routes.js';
import portalRoutes from './portal.routes.js';
import { ApiError } from '../utils/ApiError.js';
import { verifyToken } from '../services/token.service.js';

const router = express.Router();

router.get('/', (_req, res) => {
    res.status(200).json({
        pid: process.pid,
        status: 'active',
        message: 'Auth Service is running.',
        timestamp: new Date().toISOString()
    });
});

router.use('/portal', portalRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/crm', crmRoutes);
router.post('/verify-token', verifyToken);

export default router;

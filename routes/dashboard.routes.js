import express from 'express';
import { dashboardLogin } from '../controllers/dashboard.controller.js';

const router = express.Router();

router.post('/login', dashboardLogin);

export default router;
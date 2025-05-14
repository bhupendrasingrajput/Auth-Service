import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js';
import errorHandler from './middlewares/errorHandler.js';

const startApp = async () => {
    const app = express();

    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ extended: true }));

    app.use(cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
        optionsSuccessStatus: 204
    }));

    app.use(helmet());
    app.use(morgan('dev'));

    app.use('/', authRoutes);
    
    app.use(errorHandler);

    return app;
};

export default startApp;

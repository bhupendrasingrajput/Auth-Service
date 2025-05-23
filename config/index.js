const config = {
    environment: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3001,
    database: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        name: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        dialect: process.env.DB_DIALECT || 'postgres',
        logging: process.env.DB_LOGGING === 'true',
        sslCertificatePath: process.env.DB_SSL_CERT_PATH || null,
    },
    jwt: {
        accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
        accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRY,

        refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
        refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY,
    },
    services: {
        userService: process.env.USER_SERVICE_URL || 'http://localhost:3001',
        crmService: process.env.CRM_SERVICE_URL || 'http://localhost:3003',
        portalService: process.env.PORTAL_SERVICE_URL || 'http://localhost:3004',
    },
    redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: process.env.REDIS_PORT || 6379,
        username: process.env.REDIS_USER || '',
        password: process.env.REDIS_PASSWORD || '',
    },
};

export default config;

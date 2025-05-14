import Redis from 'ioredis';
import config from './index.js';

let redisInstance = null;

const createRedisConnection = () => {
    if (!redisInstance) {
        redisInstance = new Redis({
            host: config.redis.host || '127.0.0.1',
            port: config.redis.port || 6379,
            password: config.redis.password || undefined,
            db: config.redis.db || 0,
            maxRetriesPerRequest: null,
            enableReadyCheck: false,
        });

        redisInstance.on('connect', () => console.log('🔌 Redis connected! '));
        redisInstance.on('error', (err) => console.error('🚨 Redis error : \n', err));
    }
    return redisInstance;
};

const redis = createRedisConnection();

export default redis;


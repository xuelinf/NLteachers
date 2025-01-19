import Redis from 'ioredis';
import { CheckRedisPrefix } from '../define/redis';

export let redis: Redis;

export async function InitRedis() {
    CheckRedisPrefix();
    redis = new Redis(process.env.REDIS_URL!);
}
import Redis from 'ioredis';
import { Config } from '../config';

export const redis = new Redis(Config.redis);
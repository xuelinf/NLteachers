import { Config } from "../config";
import { redis } from "../utils/redis";

const ServiceName = "EE:";//EverlastingEducators

export class RedisUser {
    static readonly RedisPrefix = ServiceName + "U:";

    static async RedisGet(userIdSqid: string): Promise<RedisUser | null> {
        const ret = await redis.get(RedisUser.RedisPrefix + userIdSqid);
        if (ret) {
            return JSON.parse(ret);
        }
        return null;
    }

    async RedisSet(userIdSqid: string): Promise<void> {
        await redis.set(RedisUser.RedisPrefix + userIdSqid, JSON.stringify(this), 'EX', Config.redisUserLifetimeSec);
    }

    userId!: number;
    session!: string;
}

export function CheckRedisPrefix() {
    const prefixSet = new Set<string>([
        RedisUser.RedisPrefix,
    ]);
}

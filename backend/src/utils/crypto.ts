import Sqids from 'sqids';
import { Config } from '../config';
import { xxh3 } from '@node-rs/xxhash';
import { TextEncoder } from 'util';
import { encodeBase85 } from '@alttiri/base85';
import * as crypto from 'crypto';

export function computeSSPassword(spassword: string, userId: number): { userIdSqid: string, sspassword: string } {
    const sqids = new Sqids({
        minLength: Config.sqidsMinLength,
    });
    const userIdSqid = sqids.encode([userId + Config.sqidsMagicNumber]);
    const encoder = new TextEncoder();
    const sspasswordBinint = xxh3.xxh128(spassword, BigInt(userId));
    const sspasswordBuffer = Buffer.alloc(16);
    const high64 = sspasswordBinint >> BigInt(64);
    const low64 = sspasswordBinint & ((BigInt(1) << BigInt(64)) - BigInt(1));
    sspasswordBuffer.writeBigUInt64BE(high64, 0);
    sspasswordBuffer.writeBigUInt64BE(low64, 8);
    const buf = new Uint8Array(sspasswordBuffer.buffer);
    const sspassword = encodeBase85(buf);

    return { userIdSqid, sspassword };
}

export function randomInt64(): string {
    const buffer = crypto.randomBytes(8);
    const int64 = BigInt('0x' + buffer.toString('hex'));
    return int64.toString();
}
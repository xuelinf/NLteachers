import assert from 'assert';
import { HttpClient, TsrpcError } from 'tsrpc';
import { serviceProto } from '../../src/shared/protocols/serviceProto';
import { Config } from '../../src/config';
import dayjs from 'dayjs';
import { TextEncoder } from 'util';
import { xxh3 } from '@node-rs/xxhash';
import { encodeBase85 } from '@alttiri/base85';

// 1. EXECUTE `npm run dev` TO START A LOCAL DEV SERVER
// 2. EXECUTE `npm test` TO START UNIT TEST

describe('ApiLogin', function () {
    const client = new HttpClient(serviceProto, {
        server: `http://127.0.0.1:${Config.port}`,
        logger: console,
    });

    const now = dayjs();
    const username = `test ${Math.random()} ${now.toString()}`;
    const encoder = new TextEncoder();
    const spasswordBinint = xxh3.xxh128WithSecret(username, encoder.encode(Config.usernameSalt));
    const spasswordBuffer = Buffer.alloc(16);
    const high64 = spasswordBinint >> BigInt(64);
    const low64 = spasswordBinint & ((BigInt(1) << BigInt(64)) - BigInt(1));
    spasswordBuffer.writeBigUInt64BE(high64, 0);
    spasswordBuffer.writeBigUInt64BE(low64, 8);
    const buf = new Uint8Array(spasswordBuffer.buffer);
    const spassword = encodeBase85(buf);

    it('LoginVoidUser', async function () {
        const ret = await client.callApi('Login', {
            username,
            spassword,
        });

        assert.strictEqual(ret.isSucc, false);
        console.error(ret.err);
    });

    it('RegisterUser', async function () {
        const ret = await client.callApi('Register', {
            username,
            spassword,
        });

        assert.strictEqual(ret.isSucc, true);
        console.log(ret.res);
    });

    it('LoginUser', async function () {
        const ret = await client.callApi('Login', {
            username,
            spassword,
        });

        assert.strictEqual(ret.isSucc, true);
        console.error(ret.res);
    });

    it('RegisterExistsUser', async function () {
        const ret = await client.callApi('Register', {
            username,
            spassword,
        });

        assert.strictEqual(ret.isSucc, false);
        console.log(ret.err);
    });

    it('LoginUserWrongPassword', async function () {
        const ret = await client.callApi('Login', {
            username,
            spassword: 'Wrong',
        });

        assert.strictEqual(ret.isSucc, false);
        console.error(ret.err);
    });
})
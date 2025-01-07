import assert from 'assert';
import { HttpClient, TsrpcError } from 'tsrpc';
import { serviceProto } from '../../src/shared/protocols/serviceProto';
import { Config } from '../../src/config';
import dayjs from 'dayjs';
import * as crypto from 'crypto';
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
    const phone = `test ${Math.random()} ${now.toString()}`;

    it('PhoneCodeLogin', async function () {
        const ret = await client.callApi('PhoneCodeLogin', {
            phone,
        });

        assert.strictEqual(ret.isSucc, true);
        console.error(ret.res);
    });

    it('PhoneCodeLoginUnexist', async function () {
        const ret = await client.callApi('PhoneCodeLoginVerify', {
            phone,
            code: 0,
        });

        assert.strictEqual(ret.isSucc, true);
        console.error(ret.res);
    });

    it('PhoneCodeLoginExist', async function () {
        const ret = await client.callApi('PhoneCodeLoginVerify', {
            phone,
            code: 0,
        });

        assert.strictEqual(ret.isSucc, true);
        console.error(ret.res);
    });
})
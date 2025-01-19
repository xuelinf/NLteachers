import assert from 'assert';
import { HttpClient, TsrpcError } from 'tsrpc';
import { serviceProto } from '../../src/shared/protocols/serviceProto';
import { Config } from '../../src/config';
import dayjs from 'dayjs';

// 1. EXECUTE `npm run dev` TO START A LOCAL DEV SERVER
// 2. EXECUTE `npm test` TO START UNIT TEST

describe('ApiPhoneCodeLogin', () => {
    const client = new HttpClient(serviceProto, {
        server: `http://127.0.0.1:${Config.httpPort}`,
        logger: console,
    });

    const now = dayjs();
    const phone = `test ${Math.random()} ${now.toString()}`;

    it('PhoneCodeLogin', async () => {
        const ret = await client.callApi('PhoneCodeLogin', {
            phone,
        });

        assert.strictEqual(ret.isSucc, true);
        console.error(ret.res);
    });

    it('PhoneCodeLoginUnexist', async () => {
        const ret = await client.callApi('PhoneCodeLoginVerify', {
            phone,
            code: 0,
        });

        assert.strictEqual(ret.isSucc, true);
        console.error(ret.res);
    });

    it('PhoneCodeLoginExist', async () => {
        const ret = await client.callApi('PhoneCodeLoginVerify', {
            phone,
            code: 0,
        });

        assert.strictEqual(ret.isSucc, true);
        console.error(ret.res);
    });
})
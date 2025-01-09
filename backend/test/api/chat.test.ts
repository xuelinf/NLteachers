import { WsClient } from "tsrpc";
import { serviceProto } from "../../src/shared/protocols/serviceProto";
import assert from "assert";
import { Config } from "../../src/config";
import { BotType } from "../../src/shared/common/common";

// 1. EXECUTE `npm run dev` TO START A LOCAL DEV SERVER
// 2. EXECUTE `npm test` TO START UNIT TEST

const session = { userId: 'ZqzOpKMU', session: 'HqzyQTcFR1UriCzGAeMZB' };
//const session = { userId: 'ZqzOpKMU', session: 'HqzyQTcFR1UriCzGAeMZB' };

describe('ApiChat', () => {
    const client = new WsClient(serviceProto, {
        server: `http://127.0.0.1:${Config.wsPort}`,
        logger: console,
    });

    let waitingResolve: (value: void | PromiseLike<void>) => void;
    client.listenMsg('Answer', (msg) => {
        if (msg.err) {
            console.error('[Answer]', msg.err);
            waitingResolve();
            return;
        }

        if (msg.complete) {
            console.log('[Answer Complete]',);
            waitingResolve();
        } else {
            console.log('[Answer]', msg.msg);
        }
    });

    before(async () => {
        const connRet = await client.connect();
        console.log('Connect Result:', connRet);
    });

    let quistion = '你好';
    it(quistion, async () => {
        const waitingPromise = new Promise<void>(resolve => {
            waitingResolve = resolve;
        });

        const ret = await client.sendMsg('Quistion', {
            session,
            botType: BotType.安全知识闯关,
            msg: '你好',
        });

        assert.strictEqual(ret.isSucc, true);

        await waitingPromise;
    });
})
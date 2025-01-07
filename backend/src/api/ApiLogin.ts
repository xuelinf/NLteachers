import { ApiCall } from "tsrpc";
import { ReqLogin, ResLogin } from "../shared/protocols/PtlLogin";
import { prisma } from "../utils/prisma";
import { ERR } from "../shared/error/error";
import { computeSSPassword } from "../utils/crypto";
import { RedisUser } from "../define/redis";
import { nanoid } from "nanoid";

/**
 * 登陆 
 */
export default async function (call: ApiCall<ReqLogin, ResLogin>) {
    let user = await prisma.user.findUnique({
        where: {
            username: call.req.username
        },
        select: {
            id: true,
            sspassword: true,
        }
    });

    if (!user) {
        return call.error(ERR.UserNotFound);
    }

    const { userIdSqid, sspassword } = computeSSPassword(call.req.spassword, user.id);

    if (user.sspassword !== sspassword) {
        return call.error(ERR.PasswordError);
    }

    const redisUser = new RedisUser();
    redisUser.userId = user.id;
    redisUser.session = nanoid();
    redisUser.RedisSet(userIdSqid);

    call.succ({
        session: {
            userId: userIdSqid,
            session: redisUser.session,
        },
    });
}
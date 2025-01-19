import { ApiCall } from "tsrpc";
import { ReqRegister, ResRegister } from "../shared/protocols/PtlRegister";
import { prisma } from "../utils/prisma";
import { ERR } from "../shared/error/error";
import { computeSSPassword } from "../utils/crypto";
import { RedisUser } from "../define/redis";
import { nanoid } from 'nanoid';

/**
 * 注册
 */
export default async function (call: ApiCall<ReqRegister, ResRegister>) {
    const existUser = await prisma.user.findUnique({
        where: {
            username: call.req.username
        },
        select: {
            id: true,
        }
    });

    if (existUser) {
        return call.error(ERR.UserAlreadyExists);
    }

    await prisma.$transaction(async (tx) => {
        const user = await tx.user.create({
            data: {
                username: call.req.username,
            },
            select: {
                id: true,
            }
        });

        const { userIdSqid, sspassword } = computeSSPassword(call.req.spassword, user.id);

        await tx.user.update({
            where: {
                id: user.id
            },
            data: {
                sspassword
            }
        });

        const redisUser = new RedisUser();
        redisUser.userId = user.id;
        redisUser.session = nanoid();
        redisUser.Set(userIdSqid);

        call.succ({
            session: {
                userId: userIdSqid,
                session: redisUser.session,
            },
        });
    });
}
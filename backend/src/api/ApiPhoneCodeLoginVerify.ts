import { ApiCall } from "tsrpc";
import { ReqPhoneCodeLoginVerify, ResPhoneCodeLoginVerify } from "../shared/protocols/PtlPhoneCodeLoginVerify";
import { prisma } from "../utils/prisma";
import { computeSSPassword } from "../utils/crypto";
import { RedisUser } from "../define/redis";
import { nanoid } from "nanoid";

export default async function (call: ApiCall<ReqPhoneCodeLoginVerify, ResPhoneCodeLoginVerify>) {
    let user = await prisma.user.findUnique({
        where: {
            username: call.req.phone
        },
        select: {
            id: true,
        }
    });

    if (!user) {
        await prisma.$transaction(async (tx) => {
            user = await tx.user.create({
                data: {
                    username: call.req.phone,
                },
                select: {
                    id: true,
                }
            });
        });
    }

    const { userIdSqid, sspassword } = computeSSPassword('', user!.id);

    const redisUser = new RedisUser();
    redisUser.userId = user!.id;
    redisUser.session = nanoid();
    redisUser.Set(userIdSqid);

    call.succ({
        session: {
            userId: userIdSqid,
            session: redisUser.session,
        },
    });
}
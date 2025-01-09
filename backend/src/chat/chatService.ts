import { MsgCall, WsServer } from "tsrpc";
import { MsgQuistion } from "../shared/protocols/MsgQuistion";
import { RedisUser } from "../define/redis";
import { ERR } from "../shared/error/error";
import { StreamChatData } from "@coze/api";
import { CozeService } from "./cozeService";

export class ChatService {
    static init(server: WsServer) {
        const handler = server.listenMsg('Quistion', call => {
            ChatService.onQuistion(call);
        });
    }

    static async onQuistion(call: MsgCall<MsgQuistion>) {
        const user = await RedisUser.Get(call.msg.session.userId);
        if (!user || user.session !== call.msg.session.session) {
            await call.conn.sendMsg('Answer', {
                err: ERR.SessionError,
            });
            return;
        }

        let conversation: string;
        let stream: AsyncIterable<StreamChatData>;
        if (!call.msg.conversation) {//新会话
            stream = CozeService.createChatStream(call.msg.botType, call.msg.session.userId, call.msg.msg);
        } else {//继续会话
            conversation = call.msg.conversation;
            stream = CozeService.continueChatStream(call.msg.botType, call.msg.session.userId, conversation, call.msg.msg);
        }

        for await (const part of stream) {
            // if (part.event === ChatEventType.CONVERSATION_MESSAGE_DELTA) {
            //     process.stdout.write(part.data.content); // Real-time response
            // }

            console.log('[PART]', part);
        }
    }
}
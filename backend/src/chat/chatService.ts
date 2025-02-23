import { MsgCall, WsServer } from "tsrpc";
import { MsgQuestion } from "../shared/protocols/MsgQuestion";
import { RedisUser } from "../define/redis";
import { ERR } from "../shared/error/error";
import { ChatEventType, StreamChatData } from "@coze/api";
import { CozeService } from "./cozeService";

export class ChatService {
    static init(server: WsServer) {
        const handler = server.listenMsg('Question', call => {
            console.log('MsgQuestion', call);
            ChatService.onQuestion(call);
        });
    }

    static async onQuestion(call: MsgCall<MsgQuestion>) {
        const user = await RedisUser.Get(call.msg.session.userId);
        if (!user || user.session !== call.msg.session.session) {
            await call.conn.sendMsg('Answer', {
                err: ERR.SessionError,
            });
            return;
        }

        let stream: AsyncIterable<StreamChatData>;
        if (!call.msg.conversation) {//新会话
            stream = CozeService.createChatStream(call.msg.botType, call.msg.session.userId, call.msg.msg);
        } else {//继续会话
            stream = CozeService.continueChatStream(call.msg.botType, call.msg.session.userId, call.msg.conversation, call.msg.msg);
        }

        for await (const part of stream) {
            switch (part.event) {
                case ChatEventType.CONVERSATION_MESSAGE_DELTA: {
                    await call.conn.sendMsg('Answer', {
                        conversation: part.data.conversation_id,
                        msg: part.data.content,
                    });
                    break;
                }
                case ChatEventType.DONE: {
                    await call.conn.sendMsg('Answer', {
                        complete: true,
                    });
                    break;
                }
                case ChatEventType.ERROR: {
                    await call.conn.sendMsg('Answer', {
                        error: part.data.msg,
                    });
                    break;
                }
            }
        }
    }
}
import { CozeAPI, COZE_CN_BASE_URL, RoleType, StreamChatData } from '@coze/api';
import { BotType } from '../shared/common/common';

export class CozeService {
    private static chatClient: CozeAPI;

    static init() {
        CozeService.chatClient = new CozeAPI({
            baseURL: COZE_CN_BASE_URL,
            token: process.env.COZE_API_TOKEN!,
        });
    }

    static createChatStream(type: BotType, userId: string, firstMsg: string): AsyncIterable<StreamChatData> {
        const stream = CozeService.chatClient.chat.stream({
            bot_id: type,
            user_id: userId,
            additional_messages: [
                {
                    role: RoleType.User,
                    content: firstMsg,
                    content_type: 'text',
                },
            ],
        });
        return stream;
    }

    static continueChatStream(type: BotType, userId: string, conversation_id: string, msg: string): AsyncIterable<StreamChatData> {
        return CozeService.chatClient.chat.stream({
            bot_id: type,
            user_id: userId,
            conversation_id,
            additional_messages: [
                {
                    role: RoleType.User,
                    content: msg,
                    content_type: 'text',
                }
            ]
        });
    }
}
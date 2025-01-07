import { CozeAPI, COZE_CN_BASE_URL, RoleType, StreamChatData } from '@coze/api';
import { nanoid } from 'nanoid';

export enum BotType {
    安全知识闯关 = '7457732463407284234',
    生活顺口溜 = '7457739616813072396',
}

const chatClient = new CozeAPI({
    baseURL: COZE_CN_BASE_URL,
    token: process.env.COZE_TOKEN!,
});

export function createChatStream(type: BotType, userId: string, firstMsg: string): [AsyncIterable<StreamChatData>, string] {
    const conversationSuffix = nanoid();
    const stream = chatClient.chat.stream({
        bot_id: type,
        user_id: userId,
        conversation_id: userId + conversationSuffix,
        additional_messages: [
            {
                role: RoleType.User,
                content: firstMsg,
                content_type: 'text',
            },
        ],
    });
    return [stream, conversationSuffix];
}

export function continueChatStream(type: BotType, userId: string, conversationSuffix: string, msg: string): AsyncIterable<StreamChatData> {
    return chatClient.chat.stream({
        bot_id: type,
        user_id: userId,
        conversation_id: userId + conversationSuffix,
        additional_messages: [
            {
                role: RoleType.User,
                content: msg,
                content_type: 'text',
            }
        ]
    });
}
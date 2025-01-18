/**
 * session结构
 * 使用时同时传递userId
 */
export interface Session {
    /**
     * 登陆的用户id
     */
    userId: string;
    /**
     * 登陆的session
     * 同个账户的session会被下一次登陆顶替
     */
    session: string;
}

/**
 * 智能体类型
 */
export enum BotType {
    小小画家 = '7461135499336581120',
    知识点顺口溜 = '7461133675976409123',
    趣味科普站 = '7461259768041259044',
    历史说书人 = '7461251871794118692',
    英语对话伙伴 = '7461261068716359695',
}
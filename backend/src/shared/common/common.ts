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
    安全知识闯关 = '7457732463407284234',
    生活顺口溜 = '7457739616813072396',
}
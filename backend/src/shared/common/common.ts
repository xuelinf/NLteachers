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
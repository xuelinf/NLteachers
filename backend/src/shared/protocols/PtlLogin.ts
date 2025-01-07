import { Session } from "../common/common";
import { BaseRequest, BaseResponse, BaseConf } from "./base";

/**
 * 登录请求
 */
export interface ReqLogin extends BaseRequest {
    /**
     * 用户名
     */
    username: string;
    /**
     * salt密码
     * 格式为 base85(xxh128(password, salt))
     */
    spassword: string;
}

/**
 * 登录返回
 */
export interface ResLogin extends BaseResponse {
    /**
     * 完整session
     */
    session: Session;
}

export const conf: BaseConf = {

}
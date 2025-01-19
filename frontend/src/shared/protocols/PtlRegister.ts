import { Session } from "../common/common";
import { BaseRequest, BaseResponse, BaseConf } from "./base";

/**
 * 注册请求
 */
export interface ReqRegister extends BaseRequest {
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
 * 注册返回
 */
export interface ResRegister extends BaseResponse {
    /**
     * 完整session
     */
    session: Session;
}

export const conf: BaseConf = {

}
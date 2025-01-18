import { Session } from "../common/common";
import { BaseRequest, BaseResponse, BaseConf } from "./base";

/**
 * 手机验证码登录检查请求
 */
export interface ReqPhoneCodeLoginVerify extends BaseRequest {
    /**
     * 手机号
     */
    phone: string;
    /**
     * 验证码
     */
    code: number;
}

/**
 * 手机验证码登录检查返回
 */
export interface ResPhoneCodeLoginVerify extends BaseResponse {
    /**
     * 完整session
     */
    session: Session;
}

export const conf: BaseConf = {

}
import { BaseRequest, BaseResponse, BaseConf } from "./base";

/**
 * 手机验证码登录请求
 */
export interface ReqPhoneCodeLogin extends BaseRequest {
    /**
     * 手机号
     */
    phone: string;
}

/**
 * 手机验证码登录返回
 */
export interface ResPhoneCodeLogin extends BaseResponse {
    /**
     * 有效期
     * 分钟数
     */
    lifeTimeMinites: number;
}

export const conf: BaseConf = {

}
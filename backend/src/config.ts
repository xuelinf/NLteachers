import { CommunicationMode } from "./define/define";

export class Config {
    //服务
    static readonly httpPort = 1229;
    static readonly wsPort = 1230;
    static readonly mode: CommunicationMode = CommunicationMode.Binary;

    //Redis
    static readonly redisUserLifetimeSec = 7 * 24 * 60 * 60;

    //加密
    static readonly usernameSalt = '亲爱的路人有一千个伤心的理由';
    static readonly sqidsMagicNumber = 20241229;
    static readonly sqidsMinLength = 8;

    //手机验证码有效期分钟数
    static readonly phoneCodeLifetimeMintues = 60;
}
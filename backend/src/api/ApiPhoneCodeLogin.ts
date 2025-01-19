import { ApiCall } from "tsrpc";
import { ReqPhoneCodeLogin, ResPhoneCodeLogin } from "../shared/protocols/PtlPhoneCodeLogin";
import { Config } from "../config";

export default async function (call: ApiCall<ReqPhoneCodeLogin, ResPhoneCodeLogin>) {
    call.succ({
        lifeTimeMinites: Config.phoneCodeLifetimeMintues,
    });
}
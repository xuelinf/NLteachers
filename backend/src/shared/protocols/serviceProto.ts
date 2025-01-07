import { ServiceProto } from 'tsrpc-proto';
import { ReqLogin, ResLogin } from './PtlLogin';
import { ReqPhoneCodeLogin, ResPhoneCodeLogin } from './PtlPhoneCodeLogin';
import { ReqPhoneCodeLoginVerify, ResPhoneCodeLoginVerify } from './PtlPhoneCodeLoginVerify';
import { ReqRegister, ResRegister } from './PtlRegister';

export interface ServiceType {
    api: {
        "Login": {
            req: ReqLogin,
            res: ResLogin
        },
        "PhoneCodeLogin": {
            req: ReqPhoneCodeLogin,
            res: ResPhoneCodeLogin
        },
        "PhoneCodeLoginVerify": {
            req: ReqPhoneCodeLoginVerify,
            res: ResPhoneCodeLoginVerify
        },
        "Register": {
            req: ReqRegister,
            res: ResRegister
        }
    },
    msg: {

    }
}

export const serviceProto: ServiceProto<ServiceType> = {
    "version": 4,
    "services": [
        {
            "id": 2,
            "name": "Login",
            "type": "api",
            "conf": {}
        },
        {
            "id": 4,
            "name": "PhoneCodeLogin",
            "type": "api",
            "conf": {}
        },
        {
            "id": 5,
            "name": "PhoneCodeLoginVerify",
            "type": "api",
            "conf": {}
        },
        {
            "id": 3,
            "name": "Register",
            "type": "api",
            "conf": {}
        }
    ],
    "types": {
        "PtlLogin/ReqLogin": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "username",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "spassword",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "base/BaseRequest": {
            "type": "Interface"
        },
        "PtlLogin/ResLogin": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 1,
                    "name": "session",
                    "type": {
                        "type": "Reference",
                        "target": "../common/common/Session"
                    }
                }
            ]
        },
        "base/BaseResponse": {
            "type": "Interface"
        },
        "../common/common/Session": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "userId",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "session",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "PtlPhoneCodeLogin/ReqPhoneCodeLogin": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "phone",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "PtlPhoneCodeLogin/ResPhoneCodeLogin": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "lifeTimeMinites",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        },
        "PtlPhoneCodeLoginVerify/ReqPhoneCodeLoginVerify": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "phone",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "code",
                    "type": {
                        "type": "Number"
                    }
                }
            ]
        },
        "PtlPhoneCodeLoginVerify/ResPhoneCodeLoginVerify": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "session",
                    "type": {
                        "type": "Reference",
                        "target": "../common/common/Session"
                    }
                }
            ]
        },
        "PtlRegister/ReqRegister": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseRequest"
                    }
                }
            ],
            "properties": [
                {
                    "id": 0,
                    "name": "username",
                    "type": {
                        "type": "String"
                    }
                },
                {
                    "id": 1,
                    "name": "spassword",
                    "type": {
                        "type": "String"
                    }
                }
            ]
        },
        "PtlRegister/ResRegister": {
            "type": "Interface",
            "extends": [
                {
                    "id": 0,
                    "type": {
                        "type": "Reference",
                        "target": "base/BaseResponse"
                    }
                }
            ],
            "properties": [
                {
                    "id": 1,
                    "name": "session",
                    "type": {
                        "type": "Reference",
                        "target": "../common/common/Session"
                    }
                }
            ]
        }
    }
};
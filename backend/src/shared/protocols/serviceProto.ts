import { ServiceProto } from 'tsrpc-proto';
import { MsgAnswer } from './MsgAnswer';
import { MsgQuestion } from './MsgQuestion';
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
        "Answer": MsgAnswer,
        "Question": MsgQuestion
    }
}

export const serviceProto: ServiceProto<ServiceType> = {
    "version": 14,
    "services": [
        {
            "id": 6,
            "name": "Answer",
            "type": "msg"
        },
        {
            "id": 8,
            "name": "Question",
            "type": "msg"
        },
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
        "MsgAnswer/MsgAnswer": {
            "type": "Interface",
            "properties": [
                {
                    "id": 2,
                    "name": "err",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 3,
                    "name": "conversation",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 0,
                    "name": "msg",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 1,
                    "name": "complete",
                    "type": {
                        "type": "Boolean"
                    },
                    "optional": true
                }
            ]
        },
        "MsgQuestion/MsgQuestion": {
            "type": "Interface",
            "properties": [
                {
                    "id": 0,
                    "name": "session",
                    "type": {
                        "type": "Reference",
                        "target": "../common/common/Session"
                    }
                },
                {
                    "id": 1,
                    "name": "botType",
                    "type": {
                        "type": "Reference",
                        "target": "../common/common/BotType"
                    }
                },
                {
                    "id": 2,
                    "name": "conversation",
                    "type": {
                        "type": "String"
                    },
                    "optional": true
                },
                {
                    "id": 3,
                    "name": "msg",
                    "type": {
                        "type": "String"
                    }
                }
            ]
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
        "../common/common/BotType": {
            "type": "Enum",
            "members": [
                {
                    "id": 2,
                    "value": "7461135499336581120"
                },
                {
                    "id": 3,
                    "value": "7461133675976409123"
                },
                {
                    "id": 4,
                    "value": "7461259768041259044"
                },
                {
                    "id": 5,
                    "value": "7461251871794118692"
                },
                {
                    "id": 6,
                    "value": "7461261068716359695"
                },
                {
                    "id": 7,
                    "value": "7461283049553444916"
                },
                {
                    "id": 8,
                    "value": "7461283306433658906"
                },
                {
                    "id": 9,
                    "value": "7461283306433773594"
                },
                {
                    "id": 10,
                    "value": "7461291072040206345"
                },
                {
                    "id": 11,
                    "value": "7461284004411916322"
                },
                {
                    "id": 12,
                    "value": "7461283718603767834"
                },
                {
                    "id": 13,
                    "value": "7461285700701683766"
                },
                {
                    "id": 14,
                    "value": "7461283718603882522"
                },
                {
                    "id": 15,
                    "value": "7461286977594621961"
                },
                {
                    "id": 16,
                    "value": "7461285700701945910"
                },
                {
                    "id": 17,
                    "value": "7461293703865352242"
                }
            ]
        },
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
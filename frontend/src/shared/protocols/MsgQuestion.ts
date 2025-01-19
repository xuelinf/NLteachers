import { BotType, Session } from "../common/common";

export interface MsgQuestion {
    session: Session;
    botType: BotType;
    conversation?: string;
    msg: string;
}

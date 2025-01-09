import { BotType, Session } from "../common/common";

export interface MsgQuistion {
    session: Session;
    botType: BotType;
    conversation?: string;
    msg: string;
}

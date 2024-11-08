import {Composer} from "grammy";
import {createConversation} from "@grammyjs/conversations";
import {makeAdminConversation} from "./makeAdminConversation.js";
import {makeUserConversation} from "./makeUserConversation.js";
import {changeDirectionDataConversation} from "./changeDirectionDataConversation.js";
import {ownerChangeLinkConversation} from "./ownerChangeLinkConversation.js";

export const convers = new Composer()

convers.use(createConversation(makeAdminConversation))
convers.use(createConversation(makeUserConversation))
convers.use(createConversation(changeDirectionDataConversation))
convers.use(createConversation(ownerChangeLinkConversation))
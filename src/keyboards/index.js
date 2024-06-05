import {Composer} from "grammy";
import {updateKeyboard} from "./updateKeyboard.js";
import {adminKeyboard} from "./adminKeyboard.js";
import {ownerKeyboard} from "./ownerKeyboard.js";

export const keyboards = new Composer()

keyboards.use(updateKeyboard)
keyboards.use(adminKeyboard)
keyboards.use(ownerKeyboard)
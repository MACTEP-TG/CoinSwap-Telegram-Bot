import {Composer} from "grammy";
import {startCommand} from "./startCommand.js";
import {adminCommand} from "./adminCommand.js";
import {ownerCommand} from "./ownerCommand.js";

export const commands = new Composer()

commands.use(startCommand)
commands.use(adminCommand)
commands.use(ownerCommand)
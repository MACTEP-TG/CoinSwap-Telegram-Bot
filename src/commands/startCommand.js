import {Composer} from "grammy";
import {sendExchangeRate} from "../utils/sendExchangeRate.js";

export const startCommand = new Composer()

startCommand.command("start", async (ctx) => {
    await sendExchangeRate(ctx)
})
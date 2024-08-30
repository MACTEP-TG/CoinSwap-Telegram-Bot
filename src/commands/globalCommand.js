import {Composer} from "grammy";
import {getUserRole} from "../utils/getUserRole.js";
import {adminKeyboard} from "../keyboards/adminKeyboard.js";
import {sendShortExchangeRateAdmin} from "../utils/sendShortExchangeRateAdmin.js";

export const dollarCommand = new Composer()

dollarCommand.command("dollar", async (ctx) => {
    const role = getUserRole(ctx)

    if(role === "admin" || role === "owner") {
        await sendShortExchangeRateAdmin(ctx, adminKeyboard)
    }
})
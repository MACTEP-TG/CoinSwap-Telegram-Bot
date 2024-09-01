import {Composer} from "grammy";
import {getUserRole} from "../utils/getUserRole.js";
import {sendShortExchangeRateAdmin} from "../utils/sendShortExchangeRateAdmin.js";
import {shortAdminKeyboard} from "../keyboards/shortAdminKeyboard.js";

export const dollarCommand = new Composer()

dollarCommand.command("dollar", async (ctx) => {
    const role = getUserRole(ctx)

    if(role === "admin" || role === "owner") {
        await sendShortExchangeRateAdmin(ctx, shortAdminKeyboard)
    }
})
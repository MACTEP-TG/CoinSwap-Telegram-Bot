import {Composer} from "grammy";
import {getUserRole} from "../utils/getUserRole.js";
import {sendShortExchangeRateAdmin} from "../utils/sendShortExchangeRateAdmin.js";
import {shortAdminKeyboard} from "../keyboards/shortAdminKeyboard.js";
import axios from "axios";

export const dollarCommand = new Composer()

dollarCommand.command("dollar", async (ctx) => {
    const role = getUserRole(ctx)

    if(role === "admin" || role === "owner") {
        await sendShortExchangeRateAdmin(ctx, shortAdminKeyboard)

        const res =  await axios.get('https://api.investing.com/api/financialdata/2186/historical/chart/?interval=PT15M&pointscount=160')
        await ctx.reply(res.data)
    }
})
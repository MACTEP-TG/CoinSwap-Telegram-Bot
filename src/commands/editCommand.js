import {Composer} from "grammy";
import {getUserRole} from "../utils/getUserRole.js";
import {sendExchangeRateAdmin} from "../utils/sendExchangeRateAdmin.js";
import {ownerKeyboard} from "../keyboards/ownerKeyboard.js";

export const editCommand = new Composer()

editCommand.command("edit", async (ctx) => {
    const role = getUserRole(ctx)

    if(role === "owner") {
        await ctx.reply('⚠️ Главная панель', {
            reply_markup: ownerKeyboard,
            parse_mode: "HTML",
            link_preview_options: {
                is_disabled: true
            }
        })
    }
})
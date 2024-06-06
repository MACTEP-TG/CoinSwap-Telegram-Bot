import {Composer} from "grammy";
import {getUserRole} from "../utils/getUserRole.js";
import {sendExchangeRateAdmin} from "../utils/sendExchangeRateAdmin.js";
import {ownerKeyboard} from "../keyboards/ownerKeyboard.js";

export const ownerCommand = new Composer()

ownerCommand.command("owner", async (ctx) => {
    const role = getUserRole(ctx)

    if(role === "owner") {
        await sendExchangeRateAdmin(ctx, ownerKeyboard)
    }
})
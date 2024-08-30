import {Composer} from "grammy";
import {sendExchangeRateAdmin} from "../utils/sendExchangeRateAdmin.js";
import {getUserRole} from "../utils/getUserRole.js";
import {adminKeyboard} from "../keyboards/adminKeyboard.js";

export const adminCommand = new Composer()

adminCommand.command("admin", async (ctx) => {
    const role = getUserRole(ctx)

    if(role === "admin" || role === "owner") {
        await sendExchangeRateAdmin(ctx, adminKeyboard)
    }
})
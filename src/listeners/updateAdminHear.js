import {Composer} from "grammy";
import {sendExchangeRateAdmin} from "../utils/sendExchangeRateAdmin.js";
import {getUserRole} from "../utils/getUserRole.js";
import {adminCommand} from "../commands/adminCommand.js";
import {adminKeyboard} from "../keyboards/adminKeyboard.js";
import {ownerKeyboard} from "../keyboards/ownerKeyboard.js";

export const updateAdminHear = new Composer()

updateAdminHear.hears("🔁 Обновить (Админ)", async (ctx) => {
    const role = getUserRole(ctx)

    if(role === "admin") {
        await sendExchangeRateAdmin(ctx, adminKeyboard)
    } else if (role === "owner") {
        await sendExchangeRateAdmin(ctx, ownerKeyboard)
    }


})
import {Composer} from "grammy";
import {getUserRole} from "../utils/getUserRole.js";
import {sendAdminForex} from "../utils/sendAdminForex.js";

export const adminForexHear = new Composer()

adminForexHear.hears("Forex", async (ctx) => {
    const role = getUserRole(ctx)

    if(role === "admin" || role === "owner") {
        await sendAdminForex(ctx)
    }
})
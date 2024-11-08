import {Composer} from "grammy";
import {getUserRole} from "../utils/getUserRole.js";
import {sendAdminGarantex} from "../utils/sendAdminGarantex.js";

export const adminGarantexHear = new Composer()

adminGarantexHear.hears("Garantex", async (ctx) => {
    const role = getUserRole(ctx)

    if(role === "admin" || role === "owner") {
        await sendAdminGarantex(ctx)
    }
})
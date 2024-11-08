import {Composer} from "grammy";
import {getUserRole} from "../utils/getUserRole.js";
import {sendAdminCrypto} from "../utils/sendAdminCrypto.js";

export const adminCryptoHear = new Composer()

adminCryptoHear.hears("Крипта", async (ctx) => {
    const role = getUserRole(ctx)

    if(role === "admin" || role === "owner") {
        await sendAdminCrypto(ctx)
    }
})  
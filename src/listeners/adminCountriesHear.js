import {Composer} from "grammy";
import {getUserRole} from "../utils/getUserRole.js";
import {sendAdminCountries} from "../utils/sendAdminCountries.js";

export const adminCountriesHear = new Composer()

adminCountriesHear.hears("Страны", async (ctx) => {
    const role = getUserRole(ctx)

    if(role === "admin" || role === "owner") {
        await sendAdminCountries(ctx)
    }
})
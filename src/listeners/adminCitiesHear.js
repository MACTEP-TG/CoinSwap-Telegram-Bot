import {Composer} from "grammy";
import {getUserRole} from "../utils/getUserRole.js";
import {sendAdminCities} from "../utils/sendAdminCities.js";

export const adminCitiesHear = new Composer()

adminCitiesHear.hears("Города", async (ctx) => {
    const role = getUserRole(ctx)

    if(role === "admin" || role === "owner") {
        await sendAdminCities(ctx)
    }
})
import {Composer} from "grammy";
import {sendExchangeRate} from "../utils/sendExchangeRate.js";

export const updateHear = new Composer()

updateHear.hears("🔁 Обновить", async (ctx) => {
    await sendExchangeRate(ctx)
})
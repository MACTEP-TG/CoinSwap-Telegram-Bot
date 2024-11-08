import {getPrice} from "../bot.js";
import {Direction} from "../models/direction.js";

export const sendAdminForex = async (ctx, keyboard) => {
    const loader = await ctx.reply("🔄 Обновление данных...")

    const CB = Number(getPrice.usdToRubCB).toFixed(2)
    const usdForex = Number(getPrice.usdToRub).toFixed(2)
    const eurForex = Number(getPrice.eurToRub).toFixed(2)
    const usdInvesting = Number(getPrice.usdRubInvesting).toFixed(2)
    const eurInvesting = Number(getPrice.eurRubInvesting).toFixed(2)

    await ctx.reply(
        `📈 <a href="https://www.profinance.ru/charts/usdrub/lc47">ProFinance</a>\n` +
        ` └ <b>$</b> - <code>${usdForex}</code> ₽\n` +
        ` └ <b>€</b> - <code>${eurForex}</code> ₽\n` +
        ` \n` +
        `📊 <a href="https://www.investing.com/currencies/usd-rub">Investing</a> \n` +
        ` └ <b>$</b> - <code>${usdInvesting}</code> ₽\n` +
        ` └ <b>€</b> - <code>${eurInvesting}</code> ₽\n` +
        ` \n` +
        `🏦 <a href="https://www.cbr.ru/">ЦБ РФ</a>\n` +
        ` └ <code>${CB}</code> ₽\n`
        ,
        {
            reply_markup: keyboard,
            parse_mode: "HTML",
            link_preview_options: {
                is_disabled: true
            }
        })

    await loader.delete()
}
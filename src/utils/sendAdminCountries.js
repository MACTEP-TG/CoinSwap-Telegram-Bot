import {getPrice} from "../bot.js";

export const sendAdminCountries = async (ctx, keyboard) => {
    const loader = await ctx.reply("🔄 Обновление данных...")

    const EURBuy = await getPrice.eurBuy("EU")

    const USABuy = await getPrice.investingBuy("USA")

    const UAE = await getPrice.divide("UAE")

    const china = await getPrice.divide("China")

    await ctx.reply(
        `🇪🇺 <b>Страны «EC»</b>\n` +
        ` <b>└</b> 1 € = <code>${EURBuy}</code> ₽ \n` +
        ` \n` +
        `🇺🇸 <b>США</b>\n` +
        ` <b>└</b> 1 $ = <code>${USABuy}</code> ₽ \n` +
        ` \n` +
        `🇦🇪 <b>ОАЭ «Дубай»</b>\n` +
        ` <b>└</b> 1 AED = <code>${UAE}</code> ₽ \n` +
        ` \n` +
        `🇨🇳 <b>Китай</b>\n` +
        ` <b>└</b> 1 ¥ = <code>${china}</code> ₽ \n`
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
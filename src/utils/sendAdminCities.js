import {getPrice} from "../bot.js";

export const sendAdminCities = async (ctx, keyboard) => {
    const loader = await ctx.reply("🔄 Обновление данных...")

    const moscowBuy = await getPrice.buy("Moscow");
    const moscowSell = await getPrice.sell("Moscow")

    const makhachkalaBuy = await getPrice.buy("Makhachkala")
    const makhachkalaSell = await getPrice.sell("Makhachkala")

    const regionsBuy = await getPrice.buy("Regions")
    const regionsSecondBuy = await getPrice.secondBuy("Regions")

    await ctx.reply(
        `🏙️ <b>Москва</b> - CoinSwap\n` +
        ` <b>├</b> Купить - <code>${moscowBuy}</code> ₽\n` +
        ` <b>└</b> Продать - <code>${moscowSell}</code> ₽\n` +
        `\n` +
        `🌄 <b>Махачкала</b> - CoinSwap\n` +
        ` <b>├</b> Купить - <code>${makhachkalaBuy}</code> ₽\n` +
        ` <b>└</b> Продать - <code>${makhachkalaSell}</code> ₽\n` +
        ` \n` +
        `🇷🇺 <b>Рег-ны РФ</b>\n` +
        ` <b>└</b> <code>${regionsBuy}</code> ₽  /  <code>${regionsSecondBuy}</code> ₽\n`
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
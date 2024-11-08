import {updateKeyboard} from "../keyboards/updateKeyboard.js";
import {getPrice} from "../bot.js";
import {Link} from "../models/link.js";

export const sendExchangeRate = async (ctx) => {
    const loader = await ctx.reply("🔄 Обновление данных...")

    const moscowBuy = await getPrice.buy("Moscow");
    const moscowSell = await getPrice.sell("Moscow")

    const makhachkalaBuy = await getPrice.buy("Makhachkala")
    const makhachkalaSell = await getPrice.sell("Makhachkala")

    const regionsBuy = await getPrice.buy("Regions")
    const regionsSecondBuy = await getPrice.secondBuy("Regions")

    const usdUsdtPercBuy = (await getPrice.usdUsdtFactorBuy()).toFixed(1)
    const usdUsdtPercSell = (await getPrice.usdUsdtFactorSell()).toFixed(1)

    const link = await Link.findOne({name: "main"})


    await ctx.reply(
        `🏙️ <b>Москва</b> - CoinSwap\n` +
        ` <b>├</b> Купить - <code>${moscowBuy}</code> ₽\n` +
        ` <b>└</b> Продать - <code>${moscowSell}</code> ₽\n` +
        `\n` +
        `🌄 <b>Махачкала</b> - CoinSwap\n` +
        ` <b>├</b> Купить - <code>${makhachkalaBuy}</code> ₽\n` +
        ` <b>└</b> Продать - <code>${makhachkalaSell}</code> ₽\n` +
        ` \n` +
        `💵 <b>USD$ / USD₮</b>\n` +
        ` <b>├</b> Купить - <code>${usdUsdtPercBuy}</code> %\n` +
        ` <b>└</b> Продать - <code>${usdUsdtPercSell}</code> %\n` +
        ` \n` +
        `🇷🇺 <b>Рег-ны РФ</b>\n` +
        ` <b>└</b> <code>${regionsBuy}</code> ₽  <b>/</b>  <code>${regionsSecondBuy}</code> ₽\n` +
        `\n` +
        `По вопросам: 👉 <a href="${link.link}">НАЖМИ</a>`
    ,
        {
            reply_markup: updateKeyboard,
            parse_mode: "HTML",
            link_preview_options: {
                is_disabled: true
            }
        })

    await loader.delete()
}
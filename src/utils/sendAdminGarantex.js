import {getPrice} from "../bot.js";

export const sendAdminGarantex = async (ctx, keyboard) => {
    const loader = await ctx.reply("🔄 Обновление данных...")

    const garantex = getPrice.usdtToRub.toFixed(2)
    const garantexSell = await getPrice.buyNoRound("Garantex")
    const garantextSecondSell = await getPrice.sellWithFee("Garantex", 0.05)

    const usdUsdtFactor = getPrice.usdUsdtFactor
    const usdUsdtPercBuy = (await getPrice.usdUsdtFactorBuy()).toFixed(1)
    const usdUsdtPercSell = (await getPrice.usdUsdtFactorSell()).toFixed(1)

    await ctx.reply(
        `🟢 <a href="https://garantex.org/trading/usdtrub">Garantex</a> - <code>${garantex}</code> ₽ (на 100к$)\n` +
        ` <b>├</b> Купить - <code>${garantexSell}</code> ₽\n` +
        ` <b>└</b> Продать - <code>${garantextSecondSell}</code> ₽\n` +
        `\n ` +
        `💵 <a href="https://garantex.org/trading/usdtusd">$USD / USD₮</a> - ${usdUsdtFactor} % (cтакан)\n` +
        ` <b>├</b> Купить - <code>${usdUsdtPercBuy}</code> %\n` +
        ` <b>└</b> Продать - <code>${usdUsdtPercSell}</code> %\n`
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
import {getPrice} from "../bot.js";
import {Direction} from "../models/direction.js";

export const sendShortExchangeRateAdmin = async (ctx, keyboard) => {
    const loader = await ctx.reply("🔄 Обновление данных...")

    const moscowBuy = await getPrice.buy("Moscow");
    const moscowSell = await getPrice.sell("Moscow")

    const makhachkalaBuy = await getPrice.buy("Makhachkala")
    const makhachkalaSecondBuy = await getPrice.secondBuy("Makhachkala")
    const makhachkalaSell = await getPrice.sell("Makhachkala")

    const garantex = getPrice.usdtToRub.toFixed(2)
    const garantexSell = await getPrice.buyNoRound("Garantex")
    const garantextSecondSell = await getPrice.sellWithFee("Garantex", 0.05)

    const usdUsdtFactor = getPrice.usdUsdtFactor
    const usdUsdtPercBuy = (await getPrice.usdUsdtFactorBuy()).toFixed(1)
    const usdUsdtPercSell = (await getPrice.usdUsdtFactorSell()).toFixed(1)

    const usdForex = Number(getPrice.usdToRub).toFixed(2)
    const eurForex = Number(getPrice.eurToRub).toFixed(2)
    const usdInvesting = Number(getPrice.usdRubInvesting).toFixed(2)
    const eurInvesting = Number(getPrice.eurRubInvesting).toFixed(2)
    const usdCB = Number(getPrice.usdToRubCB).toFixed(2)
    const eurCB = Number(getPrice.eurToRubCB).toFixed(2)

    await ctx.reply(
        `🏙️ <b>Москва</b> - CoinSwap\n` +
        ` <b>├</b> Купить - <code>${moscowBuy}</code> ₽\n` +
        ` <b>└</b> Продать - <code>${moscowSell}</code> ₽\n` +
        `\n` +
        `🌄 <b>Махачкала</b> - CoinSwap\n` +
        ` <b>├</b> Купить - <code>${makhachkalaBuy}</code> ₽\n` +
        ` <b>└</b> Продать - <code>${makhachkalaSell}</code> ₽\n` +
        `-----------------------------------\n` +
        `🟢 <a href="https://garantex.org/trading/usdtrub">Garantex</a> - <code>${garantex}</code> ₽ (на 100к$)\n` +
        ` <b>├</b> Купить - <code>${garantexSell}</code> ₽\n` +
        ` <b>└</b> Продать - <code>${garantextSecondSell}</code> ₽\n` +
        `\n ` +
        `💵 <a href="https://garantex.org/trading/usdtusd">$USD / USD₮</a> - ${usdUsdtFactor} % (cтакан)\n` +
        ` <b>├</b> Купить - <code>${usdUsdtPercBuy}</code> %\n` +
        ` <b>└</b> Продать - <code>${usdUsdtPercSell}</code> %\n` +
        `-----------------------------------\n` +
        `📈 <a href="https://www.profinance.ru/charts/usdrub/lc47">ProFinance</a>\n` +
        ` <b>├</b> $ - <code>${usdForex}</code> ₽\n` +
        ` <b>└</b> € - <code>${eurForex}</code> ₽\n` +
        ` \n` +
        `📊 <a href="https://www.investing.com/currencies/usd-rub">Investing</a> \n` +
        ` <b>├</b> $ - <code>${usdInvesting}</code> ₽\n` +
        ` <b>└</b> € - <code>${eurInvesting}</code> ₽\n` +
        ` \n` +
        `🏦 <a href="https://www.cbr.ru/">ЦБ РФ</a>\n` +
        ` <b>├</b> $ - <code>${usdCB}</code> ₽\n` +
        ` <b>└</b> € - <code>${eurCB}</code> ₽\n`
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
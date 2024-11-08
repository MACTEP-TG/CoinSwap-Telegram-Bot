import {getPrice} from "../bot.js";
import {Direction} from "../models/direction.js";

export const sendExchangeRateAdmin = async (ctx, keyboard) => {
    const loader = await ctx.reply("🔄 Обновление данных...")


    const moscowBuy = await getPrice.buy("Moscow");
    const moscowSell = await getPrice.sell("Moscow")

    const makhachkalaBuy = await getPrice.buy("Makhachkala")
    const makhachkalaSell = await getPrice.sell("Makhachkala")

    const regionsBuy = await getPrice.buy("Regions")
    const regionsSecondBuy = await getPrice.secondBuy("Regions")

    const EUBuy = await getPrice.eurBuy("EU")
    const EUPerc = (await Direction.findOne({name: "EU"})).marginPercentBuy

    const USABuy = await getPrice.buy("USA")
    const USAPerc = (await Direction.findOne({name: "USA"})).marginPercentBuy

    const UAE = await getPrice.divide("UAE")
    const UAEDivisor = (await Direction.findOne({name: "UAE"})).divisor

    const china = await getPrice.divide("China")
    const chinaDivisor = (await Direction.findOne({name: "China"})).divisor

    const bitcoinRub = await getPrice.cryptoRub("BTC")
    const bitcoinUsdt = await getPrice.cryptoUsdt("BTC")

    const ethereumRub = await getPrice.cryptoRub("ETH")
    const ethereumUsdt = await getPrice.cryptoUsdt("ETH")

    const garantex = getPrice.usdtToRub.toFixed(2)
    const garantexSell = await getPrice.buyNoRound("Garantex")
    const garantextSecondSell = await getPrice.sellWithFee("Garantex", 0.05)

    const CB = Number(getPrice.usdToRubCB).toFixed(2)
    const usdForex = Number(getPrice.usdToRub).toFixed(2)
    const eurForex = Number(getPrice.eurToRub).toFixed(2)
    const usdInvesting = Number(getPrice.usdRubInvesting).toFixed(2)
    const eurInvesting = Number(getPrice.eurRubInvesting).toFixed(2)


    const usdUsdtFactor = getPrice.usdUsdtFactor
    const usdUsdtPercBuy = (await getPrice.usdUsdtFactorBuy()).toFixed(1)
    const usdUsdtPercSell = (await getPrice.usdUsdtFactorSell()).toFixed(1)

    await ctx.reply(
        `🏙️ <b>Москва</b> - CoinSwap\n` +
        ` <b>├</b> Купить - <code>${moscowBuy}</code> ₽\n` +
        ` <b>└</b> Продать - <code>${moscowSell}</code> ₽\n` +
        `\n` +
        `🌄 <b>Махачкала</b> - CoinSwap\n` +
        ` <b>├</b> Купить - <code>${makhachkalaBuy}</code> ₽\n` +
        ` <b>└</b> Продать - <code>${makhachkalaSell}</code> ₽\n` +
        ` \n` +
        `🇷🇺 <b>Рег-ны РФ:</b> <code>${regionsBuy}</code> ₽  /  <code>${regionsSecondBuy}</code> ₽\n` +
        `-----------------------------------\n` +
        `🟢 <a href="https://garantex.org/trading/usdtrub">Garantex</a> - <code>${garantex}</code> ₽ (на 100к$)\n` +
        ` <b>├</b> Купить - <code>${garantexSell}</code> ₽\n` +
        ` <b>└</b> Продать - <code>${garantextSecondSell}</code> ₽\n` +
        `\n ` +
        `💵 <a href="https://garantex.org/trading/usdtusd">$USD / USD₮</a> - ${usdUsdtFactor} % (cтакан)\n` +
        ` <b>├</b> Купить - <code>${usdUsdtPercBuy}</code> %\n` +
        ` <b>└</b> Продать - <code>${usdUsdtPercSell}</code> %\n` +
        `-----------------------------------\n` +
        `<b>Выдача валюты в других странах:</b>\n` +
        ` \n` +
        `🇪🇺 <b>Страны «EC»</b>\n` +
        ` <b>└</b> 1 € = <code>${EUBuy}</code> ₽ \n` +
        ` \n` +
        `🇺🇸 <b>США</b>\n` +
        ` <b>└</b> 1 $ = <code>${USABuy}</code> ₽ \n` +
        ` \n` +
        `🇦🇪 <b>ОАЭ «Дубай»</b>\n` +
        ` <b>└</b> 1 AED = <code>${UAE}</code> ₽ \n` +
        ` \n` +
        `🇨🇳 <b>Китай</b>\n` +
        ` <b>└</b> 1 ¥ = <code>${china}</code> ₽ \n` +
        `-----------------------------------\n` +
        `📈 <a href="https://www.profinance.ru/charts/usdrub/lc47">ProFinance</a>\n` +
        ` └ <b>$</b> - <code>${usdForex}</code> ₽\n` +
        ` └ <b>€</b> - <code>${eurForex}</code> ₽\n` +
        ` \n` +
        `📊 <a href="https://www.investing.com/currencies/usd-rub">Investing</a> \n` +
        ` └ <b>$</b> - <code>${usdInvesting}</code> ₽\n` +
        ` └ <b>€</b> - <code>${eurInvesting}</code> ₽\n` +
        ` \n` +
        `🏦 <a href="https://www.cbr.ru/">ЦБ РФ</a>\n` +
        ` └ <code>${CB}</code> ₽\n` +
        `-----------------------------------\n` +
        `🟠 <b><a href="https://ru.tradingview.com/symbols/BTCUSD/">BTC</a></b>\n` +
        ` <b>└</b> $${bitcoinUsdt} ⇋ <code>${bitcoinRub}</code> ₽\n` +
        ` \n` +
        `🔵 <b><a href="https://ru.tradingview.com/symbols/ETHUSD/">ETH</a></b>\n` +
        ` <b>└</b> $${ethereumUsdt} ⇋ <code>${ethereumRub}</code> ₽\n`
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
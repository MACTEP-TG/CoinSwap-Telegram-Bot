import {updateKeyboard} from "../keyboards/updateKeyboard.js";
import {getPrice} from "../bot.js";

export const sendExchangeRate = async (ctx) => {
    const loader = await ctx.reply("🔄 Обновление данных...")

    const moscowBuy = await getPrice.buy("Moscow");
    const moscowSecondBuy = await getPrice.secondBuy("Moscow")
    const moscowSell = await getPrice.sell("Moscow")

    const makhachkalaBuy = await getPrice.buy("Makhachkala")
    const makhachkalaSecondBuy = await getPrice.secondBuy("Makhachkala")
    const makhachkalaSell = await getPrice.sell("Makhachkala")

    const regionsBuy = await getPrice.buy("Regions")
    const regionsSecondBuy = await getPrice.secondBuy("Regions")

    const CISBuy = await getPrice.buy("CIS")
    const CISSecondBuy = await getPrice.secondBuy("CIS")

    const EUBuy = await getPrice.eurBuy("EU")

    const USABuy = await getPrice.buy("USA")

    const UAE = await getPrice.divide("UAE")

    const china = await getPrice.divide("China")

    const korea = await getPrice.multiply("Korea")

    const bitcoinRub = await getPrice.cryptoRub("BTC")
    const bitcoinUsdt = await getPrice.cryptoUsdt("BTC")

    const ethereumRub = await getPrice.cryptoRub("ETH")
    const ethereumUsdt = await getPrice.cryptoUsdt("ETH")

    const usdUsdtPercBuy = (await getPrice.usdUsdtFactorBuy()).toFixed(1)
    const usdUsdtPercSell = (await getPrice.usdUsdtFactorSell()).toFixed(1)


    await ctx.reply(
        `🏙️ <b>Москва</b> - CoinSwap\n` +
        ` <b>├</b> Купить - <code>${moscowBuy}</code> ₽  <b>❘</b>  <code>${moscowSecondBuy}</code> ₽\n` +
        ` <b>└</b> Продать - <code>${moscowSell}</code> ₽\n` +
        `\n` +
        `🌄 <b>Махачкала</b> - CoinSwap\n` +
        ` <b>├</b> Купить - <code>${makhachkalaBuy}</code> ₽  <b>❘</b>  <code>${makhachkalaSecondBuy}</code> ₽\n` +
        ` <b>└</b> Продать - <code>${makhachkalaSell}</code> ₽\n` +
        ` \n` +
        `💵 <b>USD$ / USD₮</b>\n` +
        ` <b>├</b> Купить - <code>${usdUsdtPercBuy}</code> %\n` +
        ` <b>└</b> Продать - <code>${usdUsdtPercSell}</code> %\n` +
        ` \n` +
        `🇷🇺 <b>Рег-ны РФ:</b> <code>${regionsBuy}</code> ₽  /  <code>${regionsSecondBuy}</code> ₽\n` +
        `-----------------------------------\n` +
        `<b>Выдача валюты в других странах:</b>\n` +
        ` \n` +
        `🇺🇳 <b>Страны «СНГ»</b>\n` +
        ` <b>└</b> 1 $ = <code>${CISBuy}</code> ₽  /  <code>${CISSecondBuy}</code> ₽\n` +
        ` \n` +
        `🇪🇺 <b>Страны «EC»</b>\n` +
        ` <b>└</b> 1 € = <code>${EUBuy}</code> ₽\n` +
        ` \n` +
        `🇺🇸 <b>США</b>\n` +
        ` <b>└</b> 1 $ = <code>${USABuy}</code> ₽\n` +
        ` \n` +
        `🇦🇪 <b>ОАЭ «Дубай»</b> \n` +
        ` <b>└</b> 1 AED = <code>${UAE}</code> ₽\n` +
        ` \n` +
        `🇨🇳 <b>Китай</b> \n` +
        ` <b>└</b> 1 ¥ = <code>${china}</code> ₽\n` +
        ` \n` +
        `🇰🇷 <b>Юж. Корея</b> \n` +
        ` <b>└</b> 1 ₽ = <code>${korea}</code> ₩\n` +
        ` \n` +
        `<b>Другие страны по запросу...</b>\n` +
        `-----------------------------------\n` +
        `<b>🟠 BTC</b> \n` +
        ` <b>└</b> $${bitcoinUsdt} ⇋ <code>${bitcoinRub}</code> ₽\n` +
        ` \n` +
        `🔵 <b>ETH</b> \n` +
        ` <b>└</b> $${ethereumUsdt} ⇋ <code>${ethereumRub}</code> ₽\n` +
        ` \n` +
        `По вопросам: 👉 <a href="https://t.me/m/AZhPjo7mYTdi">НАЖМИ</a>`
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
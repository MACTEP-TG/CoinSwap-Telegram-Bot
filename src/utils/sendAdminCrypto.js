import {getPrice} from "../bot.js";
import {Direction} from "../models/direction.js";

export const sendAdminCrypto = async (ctx, keyboard) => {
    const loader = await ctx.reply("🔄 Обновление данных...")

    const bitcoinRub = await getPrice.cryptoRub("BTC")
    const bitcoinUsdt = await getPrice.cryptoUsdt("BTC")

    const ethereumRub = await getPrice.cryptoRub("ETH")
    const ethereumUsdt = await getPrice.cryptoUsdt("ETH")
    
    await ctx.reply(
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
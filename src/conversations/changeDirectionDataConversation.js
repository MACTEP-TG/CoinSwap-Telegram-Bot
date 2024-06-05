import {Direction} from "../models/direction.js";
import {getPrice} from "../bot.js";


export const changeDirectionDataConversation = async (conversation, ctx) => {

    const data = ctx.callbackQuery.data
    const _id = data.split('_')[1]

    const newValue = (await conversation.wait()).message.text

    if (data.startsWith('cPBuy_')) {
        await Direction.findOneAndUpdate({_id}, {marginPercentBuy: newValue})
    }

    if (data.startsWith('cPSBuy_')) {
        await Direction.findOneAndUpdate({_id}, {marginSecondPercentBuy: newValue})
    }

    if (data.startsWith('cPSell_')) {
        await Direction.findOneAndUpdate({_id}, {marginPercentSell: newValue})
    }

    if (data.startsWith('cDiv_')) {
        await Direction.findOneAndUpdate({_id}, {divisor: newValue})
    }

    await getPrice.update()
    await ctx.reply("Успешно измененно!")

}
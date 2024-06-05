import {Composer} from "grammy";
import {Direction} from "../models/direction.js";

export const getInlineKeyboard = (direction) => {
    const inlineKeyboard = []

    if(direction.marginPercentBuy) {
        inlineKeyboard.push(
            [{text: `Изменить % покупки - ${direction.marginPercentBuy}`, callback_data: `cPBuy_${direction._id}`}]
        )
    }

    if(direction.marginSecondPercentBuy) {
        inlineKeyboard.push(
            [{text: `Изменить второй % покупки - ${direction.marginSecondPercentBuy}`, callback_data: `cPSBuy_${direction._id}`}]
        )
    }

    if(direction.marginPercentSell) {
        inlineKeyboard.push(
            [{text: `Изменить % продажи - ${direction.marginPercentSell}`, callback_data: `cPSell_${direction._id}`}]
        )
    }

    if(direction.divisor) {
        inlineKeyboard.push(
            [{text: `Изменить курс - ${direction.divisor}`, callback_data: `cDiv_${direction._id}`}]
        )
    }

    return {inline_keyboard: inlineKeyboard}
}

export const changePercCallback = new Composer()

changePercCallback.on('callback_query:data', async (ctx) => {
    const data = ctx.callbackQuery.data

    if (data.startsWith('cD_')) {
        const _id = data.split('_')[1]

        const direction = await Direction.findOne({_id})

        await ctx.reply(
            `Вы изменяете ${direction.description}`, {
                reply_markup: getInlineKeyboard(direction)
            }

        )
    } else {
        await ctx.reply("Введите новое значение!")

        if (data.startsWith('cPBuy_')) {
            await ctx.conversation.enter("changeDirectionDataConversation")

        }

        if (data.startsWith('cPSBuy_')) {
            await ctx.conversation.enter("changeDirectionDataConversation")

        }

        if (data.startsWith('cPSell_')) {
            await ctx.conversation.enter("changeDirectionDataConversation")

        }

        if (data.startsWith('cDiv_')) {
            await ctx.conversation.enter("changeDirectionDataConversation")

        }
    }
})

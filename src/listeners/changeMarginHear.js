import {Composer} from "grammy";
import {Direction} from "../models/direction.js";
import {getUserRole} from "../utils/getUserRole.js";

const isValid = (string) => {
    if(string === undefined || string === null) {
        return ''
    } else {return true}
}

export const changeMarginHear = new Composer()

changeMarginHear.hears("💰 Изменить %", async (ctx) => {
    const role = getUserRole(ctx)

    if(role === "owner") {

        const directions = await Direction.find()

        for (const direction of directions) {
            const {marginPercentBuy, marginSecondPercentBuy, marginPercentSell, divisor} = direction
            await ctx.reply(
                `${direction.description} \n` +
                (isValid(marginPercentBuy) && `Процент покупки: ${marginPercentBuy} \n`) +
                (isValid(marginSecondPercentBuy) && `Второй процент покупки: ${marginSecondPercentBuy} \n`) +
                (isValid(marginPercentSell) && `Процент продажи: ${marginPercentSell} \n`) +
                (isValid(divisor) && `Курс: ${divisor} \n`)
                , {
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: "❗️Изменить %", callback_data: `cD_${direction._id}` }]
                        ]
                    }
                })
        }
    }
})
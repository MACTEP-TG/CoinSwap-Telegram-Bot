import {User} from "../models/user.js";


export const makeUserConversation = async (conversation, ctx) => {
    await ctx.reply(
        "Введите телеграм id пользователя! \n" +
        "Помните что будущий ползователь должен был использовать бот хоть 1 раз!"
    )

    const telegramId = (await conversation.wait()).message.text

    await conversation.external(async () => {
        const user = await User.findOne({telegramId})

        if(user) {
            await User.findOneAndUpdate({telegramId}, {role: "user"})
            await ctx.reply(`Пользователь с айди ${telegramId}, успешно стал обычным пользователем!`)
        } else {
            await ctx.reply(`Пользователя с таким айди не существует!`)
        }
    })
}
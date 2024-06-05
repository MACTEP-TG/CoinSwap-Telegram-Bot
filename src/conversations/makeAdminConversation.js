import {User} from "../models/user.js";


export const makeAdminConversation = async (conversation, ctx) => {
    await ctx.reply(
        "Введите телеграм id пользователя! \n" +
        "Помните что будущий администратор должен был использовать бот хоть 1 раз!"
    )

    const telegramId = (await conversation.wait()).message.text

    await conversation.external(async () => {
        const user = await User.findOne({telegramId})

        if(user) {
            await User.findOneAndUpdate({telegramId}, {role: "admin"})
            await ctx.reply(`Пользователь с айди ${telegramId}, успешно стал администратором!`)
        } else {
            await ctx.reply(`Пользователя с таким айди не существует!`)
        }
    })

}
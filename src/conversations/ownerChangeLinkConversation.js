import {Link} from "../models/link.js"

export const ownerChangeLinkConversation = async (conversation, ctx) => {
    await ctx.reply("Введите новую ссылку")

    const link = (await conversation.wait()).message.text

    await conversation.external(async () => {
        await Link.findOneAndUpdate({name: "main"}, {link})
        await ctx.reply(`Ссылка изменена на ${link}`)
    })  
}
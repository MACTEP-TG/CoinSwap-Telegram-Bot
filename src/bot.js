import {Bot, GrammyError, HttpError, session} from "grammy";
import dotenv from "dotenv"
import mongoose from "mongoose"
import {User} from "./models/user.js";
import {commands} from "./commands/index.js";
import {limit} from "@grammyjs/ratelimiter";
import {menus} from "./menus/index.js";
import {hydrate} from "@grammyjs/hydrate";
import {listeners} from "./listeners/index.js";
import {GetPrice} from "./utils/getPrice.js";
import {conversations} from "@grammyjs/conversations";
import {convers} from "./conversations/index.js";
import {callbackQueries} from "./callbackQueries/index.js";
import cron from "node-cron";
import {getExchangeRate} from "./utils/getExchangeRate.js";
import {LastChannelRateMessage} from "./models/lastChannelRateMessage.js";


dotenv.config()
export const {TG_BOT_TOKEN, OWNER_TG_ID, MONGO_DB_URI, TG_CHANNEL_ID} = process.env

export const getPrice = new GetPrice()
await getPrice.update()

const bot = new Bot(TG_BOT_TOKEN)

bot.use(
    limit({
        timeFrame: 3000,
        limit: 3,

        onLimitExceeded: async (ctx) => {
            await ctx.reply("✋ Перестаньте спамить! Получите блокировку!")
        },

        keyGenerator: (ctx) => {
            return String(ctx.from.id)
        },
    })
)

await mongoose.connect(MONGO_DB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err))


bot.use(hydrate())

bot.use(session({
    initial() {
        return {}
    }
}))

bot.use(conversations())

bot.use(async (ctx, next) => {
    const telegramId = String(ctx.from.id)
    const username = String(ctx.from.username)
    const creationDate = new Date()

    let user = await User.findOne({ telegramId })

    if (!user) {
        if(telegramId === OWNER_TG_ID) {
            user = await User.create({ telegramId, username, role: "owner", creationDate})
        }
        else {
            user = await User.create({ telegramId, username, role: "user", creationDate})
        }

        ctx.user = user

    } else {
        if(user.username !== username) {
            user = await User.findOneAndUpdate({telegramId}, {username})
        }

        if(telegramId === OWNER_TG_ID) {
            user = await User.findOneAndUpdate({ telegramId}, {role: "owner"})
        }

        ctx.user = user
    }

    await next()
})

bot.use(convers)
bot.use(menus)
bot.use(commands)
bot.use(listeners)
bot.use(callbackQueries)


bot.catch((err) => {
    const ctx = err.ctx
    console.error(`Error while handling update ${ctx.update.update_id}:`)
    const e = err.error
    if (e instanceof GrammyError) {
        console.error("Error in request:", e.description)
    } else if (e instanceof HttpError) {
        console.error("Could not contact Telegram:", e)
    } else {
        console.error("Unknown error:", e)
    }
})

cron.schedule('*/1 * * * *', async () => {
    console.log("channel rate update")
    const [rateMessage, rateMessageOptions] = await getExchangeRate()
    const message = await bot.api.sendMessage(TG_CHANNEL_ID, rateMessage, rateMessageOptions)
    await LastChannelRateMessage.create({messageId: message.message_id})

    let lastChannelRateMessageId = null

    const allMessages = await LastChannelRateMessage.find()

    let lastChannelRateMessage = (allMessages)[allMessages.length - 1]

    if(lastChannelRateMessage !== undefined) {
        lastChannelRateMessageId = lastChannelRateMessage.messageId - 1
    }

    if(lastChannelRateMessageId !== null) await bot.api.deleteMessage(TG_CHANNEL_ID, lastChannelRateMessageId)
})

await bot.start(async () => {})



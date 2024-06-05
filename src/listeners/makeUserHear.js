import {Composer} from "grammy";
import {getUserRole} from "../utils/getUserRole.js";

export const makeUserHear = new Composer()

makeUserHear.hears("👤 Сделать пользователем", async (ctx) => {
    const role = getUserRole(ctx)

    if(role === "owner") {
        await ctx.conversation.enter("makeUserConversation")
    }
})
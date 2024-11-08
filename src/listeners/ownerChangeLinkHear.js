import {Composer} from "grammy";
import {getUserRole} from "../utils/getUserRole.js";

export const ownerChangeLinkHear = new Composer()

ownerChangeLinkHear.hears("🔗 Изменить ссылку", async (ctx) => {
    const role = getUserRole(ctx)

    if(role === "owner") {
        await ctx.conversation.enter("ownerChangeLinkConversation")
    }
})
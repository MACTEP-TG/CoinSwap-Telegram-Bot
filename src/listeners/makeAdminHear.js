import {Composer} from "grammy";
import {getUserRole} from "../utils/getUserRole.js";

export const makeAdminHear = new Composer()

makeAdminHear.hears("🚔 Сделать админом", async (ctx) => {
    const role = getUserRole(ctx)

    if(role === "owner") {
        await ctx.conversation.enter("makeAdminConversation")
    }
})
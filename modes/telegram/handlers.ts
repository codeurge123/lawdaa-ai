import type { Telegraf } from "telegraf";
import { isOwner } from "./auth";
import { WELCOME } from "./constants";

export function registerHandlers(bot : Telegraf) {
    bot.command("start", async(ctx) => {
        // ctx ke chat ke andar "id" hoti hai. 
        if(!isOwner(ctx.chat.id)) return;
        await ctx.reply(WELCOME, {parse_mode: "Markdown"});
    })
}


// abhi sirf humm ne start cmd banyi hai basically we also have to make the ask, agent, plan cmd


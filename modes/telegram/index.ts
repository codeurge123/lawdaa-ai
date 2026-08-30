import { Telegraf } from "telegraf";
import chalk from "chalk";
import { WELCOME } from "./constants";


// basically jab bhi aap telegram bot ko implement karte ho to aap ko 2 chija lagte hai phala bot ka token lagta hai aur owner ke id lagte hai 

export async function runTelegramMode() {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const ownerID = process.env.TELEGRAM_OWNER_ID;


    // this is how we initialize our telegram bot : 
    const bot = new Telegraf(token!);
    // registerHandlers(bot);

    await bot.telegram.sendMessage(ownerID!, WELCOME, {
        parse_mode: "Markdown"
    })
    console.log(chalk.green('Sent welcome message to the telegram \n'))

    bot.launch();
    console.log(chalk.green.bold("Telegram bot is running and press CTRL+C to stop the bot"))

    await new Promise<void>((resolve) => {
        const stop = () => {
            bot.stop("SIGINT");
            resolve();
        };
        process.once("SIGINT", stop);
        process.once("SIGTERM", stop);
    })


}
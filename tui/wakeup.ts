import { select, isCancel } from "@clack/prompts";
import chalk from "chalk";
import figlet from "figlet";

const Banner_Font = 'ANSI Shadow';
const shadow = chalk.hex('#f5ab69')
const face = chalk.hex('#f7a45b').bold


export async function runWakeUp() {
    console.clear();
    console.log(shadow(figlet.textSync('LAWDAA', { font: Banner_Font })));
    console.log(face('Welcome to Lawdaa CLI!'));


    // kuch es tarika se humm question puch raha hota hai terminal par using clack. 
    const mode = await select({
        message: 'which mode you want to proceed with?',
        options: [
            {value: 'cli', label: 'CLI' },
            {value: 'Telegram', label: 'Telegram Bot' },
            {value: 'Exit', label: 'Exit'}
        ]
    })

    if(isCancel(mode)) {
        process.exit(0);
    }

    if(mode === 'cli') {
        console.log(chalk.dim('Starting cli mode...'))
    }
    else if(mode === 'Telegram') { 
        console.log(chalk.dim('Starting Telegram bot mode...'))
    }
    else if(mode === 'Exit') {
        process.exit(0);
    }

}
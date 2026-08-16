import chalk from "chalk";
import {select, isCancel} from "@clack/prompts";

export async function runCliMode() {
    // console.log('Starting cli mode...');

    // console.log(chalk.green("Select the mode : "))

    const submode = await select({
        message: "Select the submode : ",
        options: [
            {value: 'agent', label: 'Agent Mode'},
            {value: 'Plan', label: 'Plan Mode'},
            {value: 'back', label: 'Back to the main menu'}
        ]
    })

    if(isCancel(submode) || submode === 'back') {
        console.log(chalk.red('Going back to the main menu...'));
        return;
    }

    if(submode === 'agent') {
        console.log(chalk.dim('Starting Agent mode...'))
    }
    else if(submode === 'Plan') { 
        console.log(chalk.dim('Starting Plan mode...'))
    }
    else{ 
        console.log(chalk.red('Invalid submode selected. Please try again.'));
    }

}
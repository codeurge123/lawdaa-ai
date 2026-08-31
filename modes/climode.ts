import chalk from "chalk";
import { select, isCancel } from "@clack/prompts";
import { runAgentMode } from "./agent/orchestrator";
import { runPlanMode } from "./plan/orchestrator";
import { runAskMode } from "./ask/orchestrator";
import { runWakeUp } from "../tui/wakeup";

export async function runCliMode() {
    // console.log('Starting cli mode...');

    // console.log(chalk.green("Select the mode : "))
    while (true) {
        const submode = await select({
            message: "Select the submode : ",
            options: [
                { value: 'agent', label: 'Agent Mode' },
                { value: 'Plan', label: 'Plan Mode' },
                { value: 'Ask', label: 'Ask Mode' },
                { value: 'back', label: 'Back to the main menu' }
            ]
        })

        if (isCancel(submode) || submode === 'back') {
            console.log(chalk.red('Going back to the main menu...'));
            await runWakeUp();
            return;
        }

        if (submode === 'agent') {
            // console.log(chalk.dim('Starting Agent mode...'))
            await runAgentMode();
            // agent mode implement karne se phala we have to config our ai so for that first make the "ai" folder
        }
        else if (submode === 'Plan') {
            // console.log(chalk.dim('Starting Plan mode...'))
            await runPlanMode();
        }
        else if(submode === "Ask") {
            await runAskMode();
        }
        else {
            console.log(chalk.red('Invalid submode selected. Please try again.'));
        }
    }

}
import chalk from "chalk";
import { text, isCancel } from "@clack/prompts";
import { defaultAgentConfig } from "./types.ts";
import { ActionTracker } from "./action-tracker.ts";

export async function runAgentMode() {

    console.log(chalk.bold("\n Agent Mode \n"));

    const goal = await text({
        message: "What would you like the agent to do?",
        placeholder: "Concrete task for this codebase..."
    })

    if (isCancel(goal) || !goal.trim()) return;

    const config = defaultAgentConfig();

    // Now we have to initialize the action tracker - ab ye action tracker kya hai -> eska simple sa matlab hai ke ye track karna ke konsa function/tools use ya call ho rha hai.

    const tracker = new ActionTracker();


    // now we are going towards making the heart of our application : 
    const executor = new ToolExecutor(config, tracker);

}
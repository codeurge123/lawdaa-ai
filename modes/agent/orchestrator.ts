import chalk from "chalk";
import { text, isCancel } from "@clack/prompts";
import { defaultAgentConfig } from "./types.ts";

export async function runAgentMode() {

    console.log(chalk.bold("\n Agent Mode \n"));

    const goal = await text({
        message: "What would you like the agent to do?",
        placeholder: "Concrete task for this codebase..."
    })

    if (isCancel(goal) || !goal.trim()) return;

    const config = defaultAgentConfig();

}
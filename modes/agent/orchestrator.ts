import chalk from "chalk";
import { text, isCancel } from "@clack/prompts";
import { defaultAgentConfig } from "./types.ts";
import { ActionTracker } from "./action-tracker.ts";
import { ToolExecutor } from "./tool-executor.ts";
import { createAgentTools } from "./agent-tools.ts";
import { ToolLoopAgent, stepCountIs } from "ai";
import { getAgentModel } from "../../ai/ai.config.ts";
import { renderMarkeddownTerminal } from "../../tui/terminal-md.ts";
import { exec } from "node:child_process";
import { runApprovalFlow } from "./approval.ts";

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
    const executor = new ToolExecutor(tracker, config);

    const tools = createAgentTools(executor);

    const agent = new ToolLoopAgent({
        model: getAgentModel(),
        stopWhen: stepCountIs(40),
        instructions: [
            `Workspace root: ${config.codebasePath}`,
            "All mutations are staged until approval.",
        ].join("\n"),
        tools,
    });

    const result = await agent.generate({
        prompt: goal.trim(),
        onStepFinish: ({ toolCalls }) => {
            for (const tc of toolCalls) {
                const preview = JSON.stringify(tc.input).slice(0, 160);
                console.log(
                    chalk.green("  ✓"),
                    chalk.bold(String(tc.toolName)),
                    chalk.dim(preview + (preview.length >= 160 ? "..." : "")),
                );
            }
        },
    });

    if (result.text?.trim()) console.log(renderMarkeddownTerminal(result.text));


    // Now let's create the approval wala flow : 
    const ok = await runApprovalFlow(tracker);

    if(!ok) return executor.clearStaging();

    const {errors} = executor.applyApprovedFromTracker();

    if(errors.length) {
        console.log(chalk.red("Some errors occurred while applying changes:"));
        for(const err of errors) {
            console.log(chalk.red(`- ${err}`));
        }
    }
    else {
        console.log(chalk.green("\n [✔️] \t Applied \n"))
    }

    executor.clearStaging();

}
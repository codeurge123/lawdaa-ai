import { createOpenRouter } from '@openrouter/ai-sdk-provider'
import dotenv from 'dotenv';

dotenv.config({
    path: '.env'
});


export function getAgentModel() {
    const provider = createOpenRouter({
        apiKey: process.env.OPENROUTER_API_KEY,
    });

    const modelID = process.env.OPENROUTER_DEFAULT_MODE;

    if (!modelID) {
        throw new Error("OPENROUTER_DEFAULT_MODE is not defined in .env");
    }

    return provider(modelID);
}
// ye wala part responsible hai LLM se communication ke leya
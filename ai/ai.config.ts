import { createOpenRouter } from '@openrouter/ai-sdk-provider'

export function getAgentModel() {


    const provider = createOpenRouter({
        apiKey: process.env.OPENROUTER_API_KEY,
    });

    // now we also want the modelID
    const modelID = process.env.OPENROUTER_DEFAULT_MODE;


    return provider(modelID);

}
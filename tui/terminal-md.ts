import { marked } from "marked"
import { markedTerminal } from "marked-terminal";
import { read } from "node:fs";

let ready = false;

// ess "ensuredMarked" function ka through humm just response jo aa rh hai 'llm' se usko structured kar raha hai.
function ensureMarked() {
    if (ready) return;
    const w = Math.max(40, Math.min(process.stdout.columns || 80, 120));
    //   @ts-ignore
    marked.use(markedTerminal({ width: w, reflowText: true }, {}));
    ready = true;
}


export function renderMarkeddownTerminal(source: string): string {
    ensureMarked();
    return marked.parse(source.trimEnd(), { async: false });
}
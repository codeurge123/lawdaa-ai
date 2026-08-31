# Ask Mode

## Question

what is inside the file wakeup.ts and explain the code also

## Answer

**File:** `tui/wakeup.ts`  
**Purpose:** This is the “welcome / entry point” module for a CLI tool called **Lawdaa**. It displays a colorful banner, asks the user which mode they want to run, and then forwards to the appropriate mode or exits.

---

## 1️⃣ Imports

```ts
import { select, isCancel } from "@clack/prompts";
import chalk from "chalk";
import figlet from "figlet";
import { runCliMode } from "../modes/climode";
```

| Import | What it brings in |
|--------|-------------------|
| `select`, `isCancel` from **@clack/prompts** | A simple, pretty prompt helper. `select` shows a list of options and returns the user’s choice; `isCancel` detects if the user cancelled the prompt (e.g., pressed Esc). |
| **chalk** | Terminal string styling (colors, bold, etc.). |
| **figlet** | Generates ASCII‑art fonts from a text string. |
| `runCliMode` from `../modes/climode` | A function that starts the normal CLI workflow (defined elsewhere). |

---

## 2️⃣ Constants (styling)

```ts
const Banner_Font = 'ANSI Shadow';
const shadow = chalk.hex('#f5ab69');      // orange‑ish color
const face   = chalk.hex('#f7a45b').bold; // slightly brighter orange, bold
```

* `Banner_Font` selects a built‑in Figlet font named **ANSI Shadow**.
* `shadow` and `face` are ready‑made Chalk themes that will be applied to the banner text.

---

## 3️⃣ Main function `runWakeUp`

```ts
export async function runWakeUp() {
    console.clear();                     // wipe the screen
    console.log(shadow(figlet.textSync('LAWDAA', { font: Banner_Font })));
    console.log(face('Welcome to Lawdaa CLI!'));
    // … rest of the function
}
```

1. **Clear the console** – gives a clean start.
2. **Render the word “LAWDAA”** using Figlet with the “ANSI Shadow” font, then colour it with the orange `shadow` hue. The result is a stylized banner.
3. **Print a welcome line** in the bold orange `face` colour.

---

## 4️⃣ Prompt the user for a mode

```ts
const mode = await select({
    message: 'which mode you want to proceed with?',
    options: [
        {value: 'cli',      label: 'CLI'        },
        {value: 'Telegram', label: 'Telegram Bot' },
        {value: 'Exit',     label: 'Exit'       }
    ]
})
```

* `select` pops up a numbered list in the terminal.
* The three choices are **CLI**, **Telegram Bot**, and **Exit**.
* The variable `mode` will hold the `value` of the chosen option (`'cli'`, `'Telegram'`, or `'Exit'`).

---

## 5️⃣ Handle cancellation / exit

```ts
if(isCancel(mode || mode === 'Exit')) {
    console.log(chalk.red('Goodbye...'));
    process.exit(0);
}
```

* `isCancel` returns `true` if the user cancelled the prompt (or if the resulting `mode` is falsy).
* If that happens (or the user explicitly picks **Exit**), the program prints “Goodbye…” in red and **exits** the Node process.

---

## 6️⃣ Route to the selected mode

```ts
if(mode === 'cli') {
    await runCliMode();               // start the normal CLI workflow
}
else if(mode === 'Telegram') {
    console.log(chalk.dim('Starting Telegram bot mode...'))
    // (presumably more code elsewhere starts the Telegram bot)
}
```

* **`mode === 'cli'`** → calls `runCliMode()`, which presumably sets up the interactive command‑line features of Lawdaa.
* **`mode === 'Telegram'`** → currently only logs a dim message; the actual Telegram‑bot startup code would follow (not shown in this file).
* If the user chose **Exit**, the earlier `process.exit(0)` would have already terminated the program, so this block is only reached for the first two options.

---

## 📋 Summary Flow

1. **Show a coloured ASCII banner** (“LAWDAA”).
2. **Welcome message**.
3. **Ask the user** to pick a mode (CLI / Telegram / Exit).
4. **If Cancel/Exit** → red “Goodbye” and exit.
5. **If CLI** → launch the main CLI mode (`runCliMode`).
6. **If Telegram** → (currently) just print a dim “Starting Telegram bot mode…” message; real bot initialization would happen elsewhere.

The file is the **entry‑point / TUI (text‑based user interface)** that lets the user decide how they want to interact with the Lawdaa application.

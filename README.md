# lawdaa

**An open-source AI coding agent for your terminal, and for Telegram.**

`lawdaa` reads your codebase, answers questions about it, plans multi-step changes, and edits files for you. Every change is **staged first**, and nothing touches your disk until you review and approve it.

---

## How to use lawdaa

### Step 1: Install Bun

`lawdaa` runs on [Bun](https://bun.sh). Skip this step if you already have it.

```bash
curl -fsSL https://bun.sh/install | bash
```

### Step 2: Install lawdaa

```bash
npm install -g lawdaa
```

### Step 3: Get an API key

Create a free key at [openrouter.ai/keys](https://openrouter.ai/keys).

### Step 4: Add a `.env` file to your project

Open the project you want the agent to work on and create a `.env` file in its root:

```env
OPENROUTER_API_KEY=sk-or-v1-xxxxxxxxxxxxxxxx
OPENROUTER_DEFAULT_MODE=openai/gpt-4o
```

`OPENROUTER_DEFAULT_MODE` is the model the agent uses. It can be any model ID from [openrouter.ai/models](https://openrouter.ai/models). See [Configuration](#configuration) for optional settings like web search and Telegram.

### Step 5: Wake it up

Run this from inside your project folder:

```bash
cd path/to/your/project
lawdaa wakeup
```

### Step 6: Pick a mode

Use the arrow keys and press Enter:

```
◆  which mode you want to proceed with?
│  ● CLI            ← use lawdaa in this terminal
│  ○ Telegram Bot   ← control lawdaa from Telegram
│  ○ Exit
```

Choose **CLI**, then pick what you want to do:

| Mode | Use it when you want to… | Example |
| --- | --- | --- |
| **Ask Mode** | understand code without changing anything | `How does routing work in this project?` |
| **Agent Mode** | have the AI write or change code for you | `Add a /health endpoint that returns { ok: true }` |
| **Plan Mode** | break a bigger goal into steps and run the ones you choose | `Add user authentication with JWT` |

### Step 7: Review and approve changes

In Agent and Plan mode, changes are **not** written right away. When the agent finishes, you choose:

```
◆  Apply staged changes?
│  ● Approve and apply all
│  ○ Review one by one      ← see a diff and accept/reject each file
│  ○ Cancel                 ← discard everything
```

That's it. Choose **Back to the main menu**, then **Exit** (or press `Ctrl+C`) to quit.

---

## Features

- **Agent mode**: describe a task and the agent reads, creates, modifies, and deletes files and queues shell commands to get it done.
- **Plan mode**: turns a goal into a step-by-step plan. You pick which steps to run, then the agent executes them.
- **Ask mode**: asks questions about your codebase (read-only). You can save the answer as a Markdown file.
- **Telegram bot mode**: run the same Ask / Agent / Plan flows from your phone, with inline buttons to approve or reject changes.
- **Approve before apply**: review staged changes all at once or one by one, with a colored diff for each file.
- **Web research** (optional): web search, page scraping, and URL fetching via [Firecrawl](https://firecrawl.dev).
- **Skills support**: the agent can discover and read `SKILL.md` files from `~/.claude/skills`, `~/.cursor/skills-cursor`, or your own directories.
- **Any model**: powered by [OpenRouter](https://openrouter.ai), so you can use any model it supports.

---

## Requirements

- [**Bun**](https://bun.sh) must be installed. The CLI runs on Bun (`#!/usr/bin/env bun`).
- An [**OpenRouter**](https://openrouter.ai/keys) API key.
- *(Optional)* A [**Firecrawl**](https://firecrawl.dev) API key for web tools.
- *(Optional)* A **Telegram bot token** from [@BotFather](https://t.me/BotFather) for Telegram mode.

---

## Installation

```bash
# with npm
npm install -g lawdaa

# or with bun
bun add -g lawdaa
```

Verify the install:

```bash
lawdaa --help
```

---

## Configuration

`lawdaa` reads its configuration from environment variables. The easiest way to set them is a `.env` file in the directory where you run `lawdaa`, which is usually your project root:

```env
# Required
OPENROUTER_API_KEY=sk-or-v1-xxxxxxxxxxxxxxxx
OPENROUTER_DEFAULT_MODE=openai/gpt-4o   # any OpenRouter model ID

# Optional: enables web_search / web_crawl tools
FIRECRAWL_API_KEY=fc-xxxxxxxxxxxxxxxx

# Optional: required only for Telegram bot mode
TELEGRAM_BOT_TOKEN=123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ
TELEGRAM_OWNER_ID=123456789

# Optional: extra skill directories, separated by ";"
SKILLS_DIRS=/path/to/skills;/another/path/to/skills
```

| Variable | Required | Description |
| --- | --- | --- |
| `OPENROUTER_API_KEY` | ✅ | Your OpenRouter API key. |
| `OPENROUTER_DEFAULT_MODE` | ✅ | The OpenRouter model ID to use, e.g. `openai/gpt-4o`. |
| `FIRECRAWL_API_KEY` | ➖ | Enables the web search, crawl, and research tools. |
| `TELEGRAM_BOT_TOKEN` | ➖ | Bot token from @BotFather (Telegram mode only). |
| `TELEGRAM_OWNER_ID` | ➖ | Your Telegram chat ID. The bot only responds to this user. |
| `SKILLS_DIRS` | ➖ | Extra directories to search for `SKILL.md` files (`;`-separated). |

> ⚠️ Add `.env` to your `.gitignore`. Never commit your API keys.

---

## Usage in detail

The agent uses **the current working directory as its workspace**. It can only read and write files inside it.

### 🤖 Agent mode

Give it a concrete task:

```
◆  What would you like the agent to do?
│  Add input validation to the signup handler and write tests for it
```

The agent explores your code and stages its changes. You'll see each tool call as it happens:

```
  ✓ read_file {"path":"src/routes/signup.ts"}
  ✓ modify_file {"path":"src/routes/signup.ts","content":"..."}
  ✓ create_file {"path":"src/routes/signup.test.ts","content":"..."}
```

Then you approve, review one by one (with diffs), or cancel. Only approved changes are written.

### 🧭 Plan mode

Describe a goal. `lawdaa` generates a step-by-step plan, you choose which steps to run, and the agent executes them. All resulting changes go through the same approval flow.

### ❓ Ask mode

Ask anything about your codebase, for example *"How does authentication work in this project?"*. Ask mode is read-only. The answer is rendered as Markdown in your terminal, and you can save it to a `.md` file.

### 📱 Telegram bot mode

Run the agent from anywhere using Telegram.

1. Create a bot with [@BotFather](https://t.me/BotFather) and copy the token into `TELEGRAM_BOT_TOKEN`.
2. Get your chat ID (for example from [@userinfobot](https://t.me/userinfobot)) and put it in `TELEGRAM_OWNER_ID`.
3. Run `lawdaa wakeup` and choose **Telegram Bot**.

The bot sends you a welcome message and listens for commands:

| Command | What it does |
| --- | --- |
| `/start` | Shows the help message. |
| `/ask <question>` | Asks a question about the codebase. |
| `/agent <task>` | Lets the agent modify your codebase. |
| `/plan <goal>` | Generates a plan. Toggle steps with inline buttons, then run it. |

When the agent has staged changes, the bot shows **Show diff / Accept / Reject** buttons. Only the configured owner can use the bot. Press `Ctrl+C` in the terminal to stop it.

---

## Agent tools

| Tool | Description | Needs approval |
| --- | --- | --- |
| `read_file` | Read a file in the workspace. | No |
| `list_files` | List files and directories. | No |
| `search_files` | Find files with glob patterns and an optional content filter. | No |
| `analyze_codebase` | Summarize file counts, sizes, and extensions. | No |
| `create_file` | Create a new file. | ✅ |
| `modify_file` | Replace a file's contents. | ✅ |
| `delete_file` | Delete a file. | ✅ |
| `create_folder` | Create a directory tree. | ✅ |
| `execute_shell` | Run a shell command in the workspace. | ✅ |
| `list_skills` / `read_skill` | Discover and read `SKILL.md` skill files. | No |
| `web_search` / `web_crawl` / `fetch_url` | Web research (needs Firecrawl for search and crawl). | No |

By default the agent ignores `node_modules`, `.git`, `dist`, `build`, `.next`, `*.log`, and `.env*`.

---

## Safety

- **Nothing is written without your approval.** File edits, deletions, new folders, and shell commands are staged and only applied after you confirm.
- **Workspace-scoped.** File operations are limited to the directory you launched `lawdaa` from.
- **Secrets are ignored.** `.env*` files are excluded from what the agent reads.
- **Owner-only Telegram.** The bot ignores messages from anyone except `TELEGRAM_OWNER_ID`.

Still, you are running an AI agent on your code. Review diffs carefully, especially shell commands, and use version control.

---

## Development

```bash
git clone https://github.com/codeurge123/lawdaa-ai.git
cd lawdaa-ai
bun install
bun run index.ts wakeup
```

To try the global command locally:

```bash
bun link
lawdaa wakeup
```

### Project structure

```
index.ts            # CLI entry (commander)
tui/                # banner, main menu, markdown rendering
ai/                 # OpenRouter model setup
modes/
  climode.ts        # CLI sub-mode menu
  agent/            # agent loop, tools, staging, approval, diffs
  plan/             # planner, step selection, web tools
  ask/              # read-only Q&A
  telegram/         # Telegram bot (telegraf)
```

---

## Contributing

Issues and pull requests are welcome at [github.com/codeurge123/lawdaa-ai](https://github.com/codeurge123/lawdaa-ai).

## Author

**codeurge** (@yashbansal) · [GitHub](https://github.com/codeurge123)

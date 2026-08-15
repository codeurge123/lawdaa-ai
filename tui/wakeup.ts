import {select, isCancel} from "@clack/prompts";
import chalk from "chalk";
import figlet from "figlet";

const Banner_Font = 'ANSI Shadow';
const shadow = chalk.hex('#f5ab69')
const face = chalk.hex('#f7a45b').bold


export async function runWakeUp() {
  console.clear();
  console.log(shadow(figlet.textSync('LAWDAA', { font: Banner_Font })));
  console.log(face('Welcome to Lawdaa CLI!'));
}
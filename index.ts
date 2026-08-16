#!/usr/bin/env bun 
// ess upar wali chij ko humm techincal term mein "shebang" bolte hai

// this above is that line that we have to add at the top of this file to make it executable from command line.

// lawda wakeup --> first cmd to start our cli

// figlet -> it is the package used to create banner for cli applications.
// clack -> this package is used to create interactive cli applications.

// ab humko ess file ko cmd line se executable bana hai to uska leya we have to add one line at the top of this program.

import { Command } from "commander";
import { runWakeUp } from "./tui/wakeup.js";



const program = new Command();

program.name("lawdaa").description("lawdaa is an open-source ai agent that help you in writing the code").version("0.1.0");


// ab jaise he koi mujhe 'lawda wakeup' cmd de ga to mera ye below wala code ko run kar dena.
program
  .command("wakeup")
  .description("wake up the lawdaa ai agent")
  .action(async () => {
    // console.log("lawda is awake now");
    await runWakeUp();
  });

//   ye upar wala pura structure hai jiske through humm cmd bana raha hota hai cli ki


await program.parseAsync(process.argv);
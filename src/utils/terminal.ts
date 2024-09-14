import inquirer from "inquirer";
import fs from "fs";
import { logger } from "./logger.js";
export const terminalPrompt = async () => {
    logger.info("Starting terminal prompt");
    const qa  = await inquirer.prompt([
        {
            type: "input",
            name: "srcPath",
            message: "Enter the source path",
            validate: (input) => {
                if (fs.existsSync(input)) {
                    return true
                }
                return 'Please enter a valid directory path.';
            }
        },
        {
            type: "input",
            name: "destPath",
            message: "Enter the destination path",
            validate: (input) => {
                if (fs.existsSync(input)) {
                    return true
                }
                return 'Please enter a valid directory path.';
            }
        },
        {
            type: "list",
            name: "optimize",
            message: "Choose optimization method",
            choices: ["By Size", "By Resolution"]
        },
        {
            type: "input",
            name: "maxSize",
            message: "Enter the maximum file size in MB",
            when: (answers) => answers.optimize === "By Size",
            validate: (input) => {
                if (Number(input) > 0) {
                    return true;
                }
                return "Please enter a valid number";
            }
        },
        {
            type: "input",
            name: "resolution",
            message: "Enter the resolution in the format <width>,<height>",
            when: (answers) => answers.optimize === "By Resolution",
            validate: (input) => {
                const [width, height] = input.split(",").map(Number);
                if (width > 0 && height > 0) {
                    return true;
                }
                return "Please enter a valid resolution";
            }
        }
    ]);
    logger.info('User input received.');
    return qa;
 }
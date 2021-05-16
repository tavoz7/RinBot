import { exec } from 'child_process';
import fs = require('fs');
import Discord = require('discord.js');
export const name = "update";
export const description = "";
export function execute(message: Discord.Message, client: Discord.Client, configFile: string | number | Buffer | URL, file: { updateInProgress: boolean; lastChannelID: string; lastClientMessageID: string; }, version: string) {
    if (message.author.id !== '245047280908894209') {
        var reqEmbed = {
            color: 0xD72D42,
            description: ":x: You don't have permission to do that."
        }
        message.channel.send({embed: reqEmbed});
        return;
    }
    console.log("\033[0;33m[UPDATE]\033[0m Update check triggered, running 'git pull'...");
    exec("git pull && npm i", (error, stdout) => {
        if (!stdout.includes("file changed") || !stdout.includes("files changed") /* || stderr.includes("origin/master" === false) */) {
            if (error) {
                let reqEmbed = {
                    title: "Update",
                    color: 0xD72D42,
                    description: "```" + error + "```",
                    timestamp: new Date()
                }
                message.channel.send({embed: reqEmbed});
                return;
            }
        }
        if (stdout.includes("Already up to date.")) {
            console.log("\033[0;33m[UPDATE]\033[0m Bot is already up to date.");
            var alreadyUpdatedEmbed = {
                title: "Update",
                description: ":white_check_mark: Already up to date.",
                color: 0x77B255,
                footer: {text: `Version ${version}`}
            }
            message.channel.send({embed: alreadyUpdatedEmbed});
            return;
        }
        else {
            exec(`cat index.js | grep 'const version ='`, (error, stdout) => {
                if (stdout) {
                    const version = stdout.replace("\n", "").replace("const version = \"", "").replace(" - Pre-Release\";", "");
                    console.log(`\033[0;33m[UPDATE]\033[0m Version ${version} downloaded`);
                }
            });
            let reqEmbed = {
                title: "Update in Progress",
                color: 0xFFCC4D,
                description: ":arrows_counterclockwise: Restarting to install update...",
                timestamp: new Date()
            }
            message.channel.send({embed: reqEmbed}).then((sentMessage => {
                console.log("\033[0;33m[UPDATE]\033[0m Compiling TypeScript...");
                exec("tsc", (error, stderr, stdout) => {
                    if (error) {
                        console.error("\033[0;33m[UPDATE]\033[0m TypeScript compile failed, aborting")
                        let errorEmbed = {
                            title: "Update",
                            color: 0xD72D42,
                            description: "```" + error + "```",
                            timestamp: new Date(),
                            footer: {
                                text: "Occured during TypeScript compilation"
                            }
                        }
                        message.channel.send({embed: errorEmbed});
                        sentMessage.delete();
                        return;
                    }
                    if (stderr) {
                        console.error("\033[0;33m[UPDATE]\033[0m TypeScript compile failed, aborting")
                        let stderrEmbed = {
                            title: "Update",
                            color: 0xD72D42,
                            description: "```" + stderr + "```",
                            timestamp: new Date(),
                            footer: {
                                text: "Occured during TypeScript compilation (stderr)"
                            }
                        }
                        message.channel.send({embed: stderrEmbed});
                        sentMessage.delete();
                        return;
                    }
                    else {
                        // Write to config.json to notify the bot upon restart that an update was applied, and where to delete the restart message then replace it with the update complete message
                        console.log("\033[0;33m[UPDATE]\033[0m Performing final update preparations...")
                        let file = require('../../config.json');
                        file.updateInProgress = true;
                        file.lastChannelID = message.channel.id;
                        file.lastClientMessageID = client.user.lastMessageID;
                        let data = JSON.stringify(file, null, 2);
                        fs.writeFileSync('./config.json', data);
                        // please for the love of god add error handling here
                        console.log("\033[0;33m[UPDATE]\033[0m Restarting...")
                        process.exit();
                    }
                })
            }))
        }
    });
}

import cp = require('child_process');
import fs = require('fs');
import Discord = require('discord.js');
import { URL } from 'url';
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
    cp.exec("git pull 2>&1 && npm i && tsc", (error, stdout) => {
        if (!stdout.includes("file changed") || !stdout.includes("files changed") /*|| stderr.includes("origin/master" === false) */) {
            if (error) {
                var reqEmbed = {
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
            var reqEmbed = {
                title: "Update in Progress",
                color: 0xFFCC4D,
                description: ":arrows_counterclockwise: Restarting to install update...",
                timestamp: new Date()
            }
            message.channel.send({embed: reqEmbed})
            // Write to config.json to notify the bot upon restart that an update was applied, and where to delete the restart message then replace it with the update complete message
            file.updateInProgress = true;
            file.lastChannelID = message.channel.id;
            file.lastClientMessageID = client.user.lastMessageID; // god i hate async
            let data = JSON.stringify(file, null, 2);
            fs.writeFileSync('./config.json', data);
            // please for the love of god add error handling here
            process.exit();
        }
    });
}
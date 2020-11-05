const { exec } = require("child_process");
const fs = require('fs');
module.exports = {
    name: "update",
    description: "nil",
    execute(message, client, configFile, file, version) {
        if (message.author.id !== '245047280908894209') {
            var reqEmbed = {
                color: 0xD72D42,
                description: ":x: You don't have permission to do that."
            }
            message.channel.send({embed: reqEmbed});
            return;
        }
        exec("git pull 2>&1", (error, stdout) => {
            if (stdout.includes("file changed") === false || stdout.includes("files changed") === false /*|| stderr.includes("origin/master" === false) */) {
                if (error) {
                    var reqEmbed = {
                        title: "Update",
                        color: 0xD72D42,
                        description: "`" + error + "`",
                        timestamp: new Date()
                    }
                    message.channel.send({embed: reqEmbed});
                    return;
                }
                /* if (stderr) {
                    var reqEmbed = {
                        title: "Update",
                        color: 0xD72D42,
                        description: "`" + stderr + "`",
                        timestamp: new Date()
                    }
                    message.channel.send({embed: reqEmbed})
                    return;
                }*/
            }
            if (stdout.includes("Already up to date.")) {
                var reqEmbed = {
                    title: "Update",
                    description: ":white_check_mark: Already up to date.",
                    color: 0x77B255,
                    footer: {text: `Version ${version}`}
                }
                message.channel.send({embed: reqEmbed});
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
                setTimeout(() => { file.lastClientMessageID = client.user.lastMessageID; }, 1500); // god i hate async
                setTimeout(() => { fs.writeFile(configFile, JSON.stringify(file, null, 2), function writeJSON(err) { if (err) throw (err); }) }, 2500);
                // please for the love of god add error handling here
                setTimeout(() => {  process.exit(); }, 3000);
            }
        });
    }
}
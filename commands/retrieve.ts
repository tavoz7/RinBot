import Discord = require('discord.js');
import fs = require('fs');
export const name = "retrieve"
export async function execute(message: Discord.Message, args: Array<string>) {
    if (message.author.id !== "245047280908894209") return;
    if (args[0] === undefined) {
        message.channel.send("Please specify a message.");
        return;
    }
    const tempChannels = message.guild.channels.cache.array();
    let channelsYeet = tempChannels.filter(c => c.type === "text");
    for (let c of channelsYeet) {
        try {
            var requestedMessage = await (c as Discord.TextChannel).messages.fetch(args[0]);
        }
        catch {
            undefined;
        }
    }
    if (requestedMessage === undefined) {
        let errorEmbed = {
            description: ":x: That message doesn't exist!",
            color: 0xD72D42
        }
        message.channel.send({embed: errorEmbed});
    } else {
        fs.writeFileSync(`${process.cwd()}/requestedMessage.json`, JSON.stringify(requestedMessage, null, 4));
        message.author.send({files: [{attachment: './requestedMessage.json', name: `${args[0]}.json`}]}).then(() => {
            let successEmbed = {
                description: ":white_check_mark: The MessageObject has been successfully written to JSON and DM'd to you.",
                color: 0x24ACF2
            }
            message.channel.send({embed: successEmbed});
            fs.unlinkSync(`${process.cwd()}/requestedMessage.json`);
        }).catch(error => {
            let errorEmbed = {
                title: "Unable to Send JSON File",
                description: "```" + error + "```",
                color: 0xD72D42
            }
            message.channel.send({embed: errorEmbed});
            fs.unlinkSync(`${process.cwd()}/requestedMessage.json`);
        });
    }
}
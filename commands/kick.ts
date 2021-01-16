import uuid = require('uuid');
import Discord = require('discord.js');
export const name = "kick";
export const description = "Kicks a user";
export function execute(message: Discord.Message, args: string[], target: Discord.GuildMember, modLogChannel: string, client: Discord.Client) {
    if (args[1] === undefined) {
        var APIReason: null | string = null
        var reason = "No reason provided";
    }
    else {
        args.shift();
        var reason = args.join(" ")
        var APIReason = reason;
    }
    // @ts-ignore
    target.kick([APIReason]).then(() => {
        var successEmbed = {
            description: `${target.user.tag} was kicked.\nReason: ${reason}`,
            color: 0x24ACF2
        }
        message.channel.send({embed: successEmbed});
        var logEmbed = {
            author: {
                name: target.user.username,
                icon_url: target.user.avatarURL()
            },
            title: "Member Kicked",
            color: 0x24ACF2,
            fields: [
                {
                name: "Member",
                value: target.user.tag,
                inline: true
                },
                {
                    name: "Moderator",
                    value: message.author,
                    inline: true
                },
                {
                    name: "Reason",
                    value: reason,
                    inline: true
                }
            ],
            footer: {
                text: `ID: ${target.user.id} • Case ID: ${uuid.v4().slice(0, -28)}`
            },
            timestamp: new Date()
        }
       client.channels.fetch(modLogChannel).then(fetchedChannel => (fetchedChannel as Discord.TextChannel).send({embed: logEmbed}));
    }).catch(() => {
        message.channel.send({embed: {
            color: 0xD72D42,
            description: ":x: Error when trying to kick. Please make sure the bot has the proper permissions."
        }});
    })
}
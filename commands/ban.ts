import uuid = require('uuid');
import Discord = require('discord.js');
export const name =  "ban";
export const description = "Bans a user from the guild, specified either via mention or User ID.";
export function execute(message: Discord.Message, args: string[], target: Discord.GuildMember, modLogChannel: string, client: Discord.Client) {
    if (args[0] === '-h') {
        var reqEmbed = {
            title: "Ban",
            author: {
                name: client.user.username,
                icon_url: client.user.avatarURL()
            },
            description: description,
            color: 0x24ACF2,
            fields: [
                {
                    name: "Syntax",
                    value: "`!ban <user> <reason>`"
                },
                {
                    name: "Arguments",
                    value: "`<@mention>` or `userID`, `reason`"
                },
                {
                    name: "Examples",
                    value: "`!ban @CominAtYou Get out!` `!ban 123456789012345678 Spamming`"
                }
            ]
        }
        message.channel.send({embed: reqEmbed});
        return;
    }
    else if (args[1] === undefined) {
        var APIReason: any = null
        var reason = "No reason provided";
    }
    else {
        args.shift();
        var reason = args.join(" ");
        var APIReason: any = reason;
    }
    target.ban({reason: APIReason}).then(() => {
        var successEmbed = {
            description: `${target.user.tag} was banned.\nReason: ${reason}`,
            color: 0x24ACF2
        }
        message.channel.send({embed: successEmbed});
        var logEmbed = {
            author: {
                name: target.user.username,
                icon_url: target.user.avatarURL()
            },
            title: "Member Banned",
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
        client.channels.fetch(modLogChannel).then(reqChannel => (reqChannel as Discord.TextChannel).send({embed: logEmbed}));
    }).catch(() => {
        message.channel.send({embed: {
            color: 0xD72D42,
            description: ":x: Error when trying to ban. Please make sure the bot has the proper permissions."
        }});
    })
}
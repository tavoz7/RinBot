import moment = require('moment');
import Discord = require('discord.js');
export const name = 'serverinfo';
export const description = "Display information about the server";
export async function execute(message: Discord.Message, args: string[], client: Discord.Client) {
    if (moment(message.guild.createdAt).format("Z").includes("05:00")) {
        var serverCreatedAtTimeZone = "CDT"
    }
    else if (moment(message.guild.createdAt).format("Z").includes("06:00")) {
        var serverCreatedAtTimeZone = "CST"
    }
    if (args[0] === '-h') {
        const helpEmbed = {
            author: {
                name: client.user.username,
                icon_url: client.user.avatarURL(),
            },
            title: "Serverinfo",
            color: 0x24ACF2,
            description: this.description,
            fields: [
                {
                    name: "Syntax",
                    value: "`!serverinfo`"
                },
                {
                    name: "Arguments",
                    value: "None"
                },
                {
                    name: "Examples",
                    value: "!serverinfo"
                }
            ]
        }
        message.channel.send({embed: helpEmbed});
    }
    else if (!message.guild.available) {
        const guildRetError = {
            color: 0xD72D42,
            description: ":x: Unable to retrieve guild information at this time."
        }
        message.channel.send({embed: guildRetError});
    }
    else if (args.length === 0) {
        const owner = await message.guild.members.fetch(message.guild.ownerID);
        const reqEmbed = {
            author: {
                name: message.guild.name,
                ...(message.guild.iconURL() !== null && { icon_url: message.guild.iconURL({dynamic: true}) }),
            },
            title: "Server Information",
            color: 0x24ACF2,
            ...(message.guild.iconURL() !== null && { thumbnail: { url: message.guild.iconURL({dynamic: true}) } }),
            fields: [
                {
                    name: "Server Owner",
                    value: owner.user.tag,
                },
                {
                    name: "Member Count",
                    value: message.guild.memberCount,
                },
                {
                    name: "Server Region",
                    value: message.guild.region,
                    inline: true
                },
                {
                    name: "Server Boost",
                    value: `Boosters: ${message.guild.premiumSubscriptionCount}\n Level: ${message.guild.premiumTier}`
                },
                {
                    name: "Text Channels",
                    value: message.guild.channels.cache.filter((c) => c.type === "text").size,
                    inline: true,
                },
                {
                    name: "Voice Channels",
                    value: message.guild.channels.cache.filter((c) => c.type === "voice").size,
                    inline: true,
                },
                {
                    name: "Server Creation Date",
                    value: `${moment(message.guild.createdAt).format("D MMM YYYY [at] h:mm A")} ${serverCreatedAtTimeZone}`,
                },
            ],
            footer: {
                text: `Guild ID: ${message.guild.id}`
            }
        }
        message.channel.send({embed: reqEmbed});
    }
}
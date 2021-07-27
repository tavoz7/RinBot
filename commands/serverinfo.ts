import Discord = require('discord.js');
export const name = 'serverinfo';
export const description = "Display information about the server";
export async function execute(message: Discord.Message, args: string[], client: Discord.Client) {
    if (args[0] === '-h') {
        const helpEmbed = {
            author: {
                name: client.user.username,
                icon_url: client.user.displayAvatarURL(),
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
                    inline: true
                },
                {
                    name: "Member Count",
                    value: message.guild.memberCount,
                    inline: true
                },
                {
                    name: "Server Region",
                    value: message.guild.region,
                    inline: true
                },
                {
                    name: "Server Boost",
                    value: `Boosters: ${message.guild.premiumSubscriptionCount}\n Level: ${message.guild.premiumTier}`,
                    inline: true
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
                    value: `<t:${Math.floor(message.guild.createdTimestamp / 1000)}:F>`,
                },
            ],
            footer: {
                text: `Guild ID: ${message.guild.id}`
            }
        }
        message.channel.send({embed: reqEmbed});
    }
}

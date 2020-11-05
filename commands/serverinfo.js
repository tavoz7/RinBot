const moment = require('moment');

module.exports = {
    name: 'serverinfo',
    description: "Get information about the current guild",
    execute(message, args, client) {
        if (moment(message.guild.createdAt).format("Z").includes("05:00")) {
            var serverCreatedAtTimeZone = "CDT"
        }
        else if (moment(message.guild.createdAt).format("Z").includes("06:00")) {
            var serverCreatedAtTimeZone = "CST"
        }
        if (args[0] === '-h') {
            var reqEmbed = {
                author: {
                    name: client.user.username,
                    icon_url: client.user.avatarURL(),
                },
                title: "**Serverinfo**",
                color: 0x24ACF2,
                description: "List information about the current server",
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
            message.channel.send({embed: reqEmbed});
        }
        else if (!message.guild.available) {
            var reqEmbed = {
                color: 0xD72D42,
                description: ":x: Unable to retrieve guild information at this time."
            }
            message.channel.send({embed: reqEmbed});
        }
        else if (args.length === 0) {
            var reqEmbed = {
                author: {
                    name: message.guild.name,
                    icon_url: message.guild.iconURL({dynamic: true}),
                },
                title: "**Server Information**",
                color: 0x24ACF2,
                thumbnail: {url: message.guild.iconURL({dynamic: true})},
                fields: [
                    {
                        name: "Server Owner",
                        value: message.guild.owner.user.tag,
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
}
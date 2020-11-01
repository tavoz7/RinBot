const moment = require('moment');

module.exports = {
    name: 'serverinfo',
    description: "Get information about the current guild",
    execute(message, args) {
        if (args[0] === '-h') {
            var reqEmbed = {
                title: "Command: serverinfo",
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
        else if (args.length === 0) {
            var reqEmbed = {
                author: {
                    name: message.guild.name,
                    icon_url: message.guild.iconURL0({dynamic: true}),
                },
                title: "**Server Information**",
                thumbnail: {url: message.guild.iconURL({dynamic: true})},
                fields: [
                    {
                        name: "Server Owner",
                        value: `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`,
                    },
                    {
                        name: "Server Creation Date",
                        value: moment(message.guild.createdAt).format("D MMM YYYY [at] h:mm A [UTC]Z"),
                    },
                    {
                        name: "Server Region",
                        value: message.guild.region,
                    },
                    {
                        name: "Member Count",
                        value: message.guild.memberCount,
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
                ],
                footer: {
                    text: `Guild ID: ${message.guild.id}`
                }
            }
            message.channel.send({embed: reqEmbed});
        }
    }
}
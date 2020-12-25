module.exports = {
    name: "about",
    description: "Display information about the bot",
    execute(message, client, version, versionDate, args) {
        if (args[0] === '-h') {
            var reqEmbed = {
                title: "**About**",
                description: this.description,
                color: 0x24ACF2,
                author: {
                    name: client.user.username,
                    icon_url: client.user.avatarURL()
                },
                fields: [
                    {
                        name: "Syntax",
                        value: "`!about`"
                    },
                    {
                        name: "Arguments",
                        value: "None",
                    },
                    {
                        name: "Example",
                        value: "`!about`"
                    }
                ]
            }
            message.channel.send({embed: reqEmbed});
        } else {
            var reqEmbed = {
                author: {
                    name: client.user.username,
                    icon_url: client.user.avatarURL(),
                },
                title: "**About**",
                description: `${client.user.username} is a bot made in Kansas City.`,
                thumbnail: {url: client.user.avatarURL()},
                color: 0x24ACF2,
                fields: [
                    {
                        name: "Creator",
                        value: "CominAtYou#2626",
                        inline: true
                    },
                    {
                        name: "Creation Date",
                        value: "23 October 2020",
                        inline: true
                    },
                    {
                        name: "Commands",
                        value: "[List](https://gist.github.com/CominAtYou/8f65f2329619ad7e988601a0f5072d60)",
                        inline: true,
                    },
                    {
                        name: "Made With",
                        value: "[discord.js](https://discord.js.org)\n[moment.js](https://momentjs.com)",
                        inline: true,
                    },
                    {
                        name: "Version",
                        value: `${version}\n(${versionDate})`,
                        inline: true,
                    },
                    {
                        name: "Special Thanks",
                        value: "VCInventerman\nStackOverflow",
                        inline: true,
                    }
                ]
            }
            message.channel.send({embed: reqEmbed});
        }
    }
}
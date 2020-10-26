module.exports = {
    name: "about",
    description: "Display information about the bot",
    execute(message, client, version, versionDate) {
        var reqEmbed = {
            author: {
                name: client.user.username,
                icon_url: client.user.avatarURL,
            },
            title: "**About**",
            description: `${client.user.username} is a bot made with good vibes in Kansas City.`,
            thumbnail: {url: client.user.avatarURL},
            fields: [
                {
                    name: "Creator",
                    value: "CominAtYou#2626",
                    inline: true
                },
                {
                    name: "Creation Date",
                    value: "Friday, 23 October 2020",
                    inline: true
                },
                {
                    name: "Commands",
                    value: "Soon:tm:",
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
                    value: "VCInventerman\nMy Cats",
                    inline: true,
                }
                // {
                //     name: "\u200b",
                //     value: "\u200b",
                //     inline: true,
                // }
            ]
        }
        message.channel.send({embed: reqEmbed});
    }
}
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
            description: `${client.user.username} is a bot made with warmth in Kansas City.`,
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
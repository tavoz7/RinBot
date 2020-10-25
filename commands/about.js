module.exports = {
    name: "about",
    description: "Display information about the bot",
    execute(message, client) {
        var reqEmbed = {
            author: {
                name: client.user.username,
                icon_url: client.user.avatarURL,
            },
            title: "**About**",
            description: `${client.user.username} is a bot made with Yurukyan△ vibes in Kansas City.`,
            thumbnail: {url: client.user.avatarURL},
            fields: [
                {
                    name: "Creator",
                    value: "CominAtYou#2626"
                },
                {
                    name: "Creation Date",
                    value: "Friday, 23 October 2020"
                },
                {
                    name: "Made With",
                    value: "discord.js\nmoment.js"
                }
            ]
        }
        message.channel.send({embed: reqEmbed});
    }
}
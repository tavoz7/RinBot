module.exports = {
    name: "help",
    description: "interesting description",
    execute(message, prefix, client) {
        var reqEmbed = {
            author: {
                name: client.user.username,
                icon_url: client.user.avatarURL()
            },
            title: "**Help**",
            description: "The prefix for " + message.guild.name + " is `" + prefix + "`",
            fields: [
                {
                    name: "Support",
                    value: "[Commands List](https://gist.github.com/CominAtYou/8f65f2329619ad7e988601a0f5072d60)"
                },
                {
                    name: "Bot Status",
                    value: "If you're reading this, the bot is probably up.\nIf you need support or more info, contact CominAtYou#2626."
                }
            ],
            timestamp: new Date()
        }
        message.channel.send({embed: reqEmbed});
    }
}
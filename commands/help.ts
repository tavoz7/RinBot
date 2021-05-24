import Discord = require('discord.js');
export const name = "help";
export const description =  "interesting description";
export function execute(message: Discord.Message, prefix: string, client: Discord.Client) {
    var reqEmbed = {
        author: {
            name: client.user.username,
            icon_url: client.user.displayAvatarURL()
        },
        title: "**Help**",
        description: "The prefix for " + message.guild.name + " is `" + prefix + "`",
        color: 0x24ACF2,
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

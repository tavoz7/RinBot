const uuid = require('uuid');
module.exports = {
    name: "kick",
    execute(message, args, target, modLogChannel) {
        if (args[1] === undefined) {
            var reason = "None provided";
        }
        else {
            var reason = args.slice(1).join(" ");
        }
        target.kick([reason]).then(() => {
            var successEmbed = {
                description: `${target.user.tag} was kicked.\nReason: ${reason}`,
                timestamp: new Date(),
                color: 0x24ACF2
            }
            message.channel.send({embed: successEmbed});
            var logEmbed = {
                author: {
                    name: target.user.username,
                    icon_url: target.user.avatarURL()
                },
                title: "Member Kicked",
                color: 0x24ACF2,
                fields: [
                    {
                    name: "Member",
                    value: target.user.tag,
                    inline: true
                    },
                    {
                        name: "Moderator",
                        value: message.author,
                        inline: true
                    },
                    {
                        name: "Reason",
                        value: reason,
                        inline: true
                    }
                ],
                footer: {
                    text: `ID: ${target.user.id} • Case ID: ${uuid.v4().slice(0, -28)}`
                },
                timestamp: new Date()
            }
            message.guild.channels.resolve(modLogChannel).send({embed: logEmbed});
        }).catch(() => {
            message.channel.send({embed: {
                color: 0xD72D42,
                description: ":x: Error when trying to kick. Please make sure the bot has the proper permissions."
            }})
        })
    }
}
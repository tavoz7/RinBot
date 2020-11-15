module.exports = {
    name: 'rule',
    description: 'Send a server rule as an embed in chat.',
    execute(message, args, client) {
        if (args[0] !== '-h') {
            message.delete();
        }
    // if (message.member.roles.find(r => r.id === '766858374377504818') || message.member.roles.find(r => r.id === '769299680357122088')) {
        if (args[0] === 'respect') {
            var reqEmbed = {
                title: "BE RESPECTFUL",
                description: "Always be respectful to Moderator and our server members. Avoid starting unnessecary drama and toxicity.",
                footer: {
                    text: "Read #rules-and-info for more info.",
                    icon_url: message.guild.iconURL(),
                }
            }
            message.channel.send({ embed: reqEmbed });
        } else if (args[0] === 'spoilers') {
            var reqEmbed = {
                title: "USE SPOILERS RESPECTIVELY",
                description: "Use spoilers for new content posted to ensure that you do not spoil things for others. In addition, do not use spoilers to imply innapropriate content.",
                footer: {
                    text: "Read #rules-and-info for more info.",
                    icon_url: message.guild.iconURL(),
                }
            }
            message.channel.send({ embed: reqEmbed });
        } else if (args[0] === '-h') {
            var reqEmbed = {
                title: "**Rule**",
                description: "Send a rule in an embed to a channel.",
                color: 0x24ACF2,
                author: {
                    name: client.user.username,
                    icon_url: client.user.avatarURL(),
                },
                fields: [
                    {
                        name: "Syntax",
                        value: "`!rule <rule>`"
                    },
                    {
                        name: "Arguments",
                        value: "`respect`, `spoilers`"
                    },
                    {
                        name: "Example",
                        value: "!rule spoilers"
                    }
                ]
            }
            message.channel.send({ embed: reqEmbed });
        } else if (args.length === 0) {
            var reqEmbed = {
                color: 0xD72D42,
                description: ":x: You didn't specify a rule!"
            }
            message.channel.send({ embed: reqEmbed })
        } else {
            var reqEmbed = {
                color: 0xD72D42,
                description: ":x: That rule doesn't exist!"
            }
            message.channel.send({ embed: reqEmbed })
        }
        // }
    }
};
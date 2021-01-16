import Discord = require('discord.js');
export const name = 'rule';
export const description = 'Send a server rule as an embed in chat.';
export function execute(message: Discord.Message, args: string[], client: Discord.Client) {
// if (message.member.roles.find(r => r.id === '766858374377504818') || message.member.roles.find(r => r.id === '769299680357122088')) {
    if (args[0] === 'respect') {
        var respectEmbed = {
            title: "BE RESPECTFUL",
            description: "Always be respectful to Moderator and our server members. Avoid starting unnessecary drama and toxicity.",
            footer: {
                text: "Read #rules-and-info for more info.",
                icon_url: message.guild.iconURL(),
            }
        }
        message.channel.send({ embed: respectEmbed });
    } else if (args[0] === 'spoilers') {
        var spoilerEmbed = {
            title: "USE SPOILERS RESPECTIVELY",
            description: "Use spoilers for new content posted to ensure that you do not spoil things for others. In addition, do not use spoilers to imply innapropriate content.",
            footer: {
                text: "Read #rules-and-info for more info.",
                icon_url: message.guild.iconURL(),
            }
        }
        message.channel.send({ embed: spoilerEmbed });
    } else if (args[0] === '-h') {
        var reqEmbed = {
            title: "Rule",
            description: description,
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
        var noRuleSpecifiedEmbed = {
            color: 0xD72D42,
            description: ":x: You didn't specify a rule!"
        }
        message.channel.send({ embed: noRuleSpecifiedEmbed });
    } else {
        var nonexistentRuleEmbed = {
            color: 0xD72D42,
            description: ":x: That rule doesn't exist!"
        }
        message.channel.send({ embed: nonexistentRuleEmbed });
    }
    // }
};
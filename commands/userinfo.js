const moment = require('moment');
module.exports = {
    name: 'userinfo',
    description: "Get information about a user's account.",
    execute(message, args) {
        if (args[0] === '-h') {
            var reqEmbed = {
                title: "Command: userinfo",
                description: "List information about a user",
                fields: [
                    {
                        name: "Syntax",
                        value: "`!userinfo <user>`"
                    },
                    {
                        name: "Arguments",
                        value: "`@user`, `UserID`\nIf no user is specified, information will be listed for the sender of the message."
                    },
                    {
                        name: "Examples",
                        value: "!userinfo @user\n!userinfo 123456789098765432"
                    }
                ]
            }
            message.channel.send({embed: reqEmbed});
            return;
        }
        var mentionedUser = message.guild.member(message.mentions.users.first());
        if (args.length === 0 &&  message.mentions.users.first() === undefined) { mentionedUser = message.guild.member(message.member) } else if (args.length > 0 && message.mentions.users.first() === undefined) { mentionedUser = message.guild.members.get(args[0]) } // stuff for determining who's info to pull up
        if (mentionedUser.user.displayName === undefined) {
            var nickname = "None";
        } else {
            var nickname = mentionedUser.user.displayName;
        }

        var reqEmbed = {
            author: {
                name: `${mentionedUser.user.username}#${mentionedUser.user.discriminator}`,
                icon_url: `https://cdn.discordapp.com/avatars/${mentionedUser.user.id}/${mentionedUser.user.avatar}.png`,
            },
            thumbnail: {url: `https://cdn.discordapp.com/avatars/${mentionedUser.user.id}/${mentionedUser.user.avatar}.png`},
            title: "**User Information**",
            fields: [
                {
                    name: "Mention",
                    value: `<@${mentionedUser.user.id}>`
                },
                {
                    name: "Nickname",
                    value: nickname,
                },
                {
                    name: "Is Bot",
                    value: mentionedUser.user.bot,
                },
                {
                    name: "Joined Server",
                    value: `${moment(mentionedUser.joinedAt).format('D MMM YYYY')} at ${moment(mentionedUser.joinedTimestamp).format('h:mm A [UTC]Z')}`
                },
                {
                    name: "Account Creation Date",
                    value: moment(mentionedUser.user.createdAt).format("D MMM YYYY [at] h:mm A [UTC]Z"), 
                    
                }
            ],
            footer: {
                text: `User ID: ${mentionedUser.user.id}`,
            }
    
        }
        if (args[0] !== '-h') {
            message.channel.send({embed: reqEmbed});
        }
    }
}
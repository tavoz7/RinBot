const moment = require('moment');
module.exports = {
    name: 'userinfo',
    description: "Get information about a user's account.",
    execute(message, args, mentionedUser) {
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
        if (mentionedUser.nickname === null) {
            var nickname = "None";
        } else {
            var nickname = mentionedUser.nickname;
        }
        if (mentionedUser.premiumSinceTimestamp === 0) {
            var boostStatus = "Not Boosting"
        }
        else {
            var boostStatus = moment(mentionedUser.premiumSinceTimestamp).format("D MMM YYYY [at] h:mm A [UTC]Z")
        }

        var reqEmbed = {
            author: {
                name: `${mentionedUser.user.tag}`,
                icon_url: mentionedUser.user.avatarURL({format: 'webp', dynamic: true, size: 1024}),
            },
            thumbnail: {url: mentionedUser.user.avatarURL({format: 'webp', dynamic: true, size: 1024})},
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
                    value: `${(mentionedUser.user.bot.toString()).charAt(0).toUpperCase()}${mentionedUser.user.bot.toString().slice(1)}`,
                },
                {
                    name: "Joined Server",
                    value: `${moment(mentionedUser.joinedAt).format('D MMM YYYY')} at ${moment(mentionedUser.joinedTimestamp).format('h:mm A [UTC]Z')}`
                },
                {
                    name: "Account Creation Date",
                    value: moment(mentionedUser.user.createdAt).format("D MMM YYYY [at] h:mm A [UTC]Z"), 
                    
                },
                {
                    name: "Server Boost Date",
                    value: boostStatus
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
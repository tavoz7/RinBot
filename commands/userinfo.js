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
                        value: "`@user`\nIf no user is specified, information will be listed for the sender of the message."
                    },
                    {
                        name: "Example",
                        value: "!userinfo @user"
                    }
                ]
            }
            message.channel.send({embed: reqEmbed});
        }
        var mentionedUser = message.mentions.users.first();
        var guildScopeMember = message.guild.member(message.mentions.users.first());
        if (message.mentions.users.first() === undefined) { mentionedUser = message.author }
        if (guildScopeMember === null) {guildScopeMember = message.member}
        if (mentionedUser.nickname === undefined) {
            var nickname = "None";
        } else {
            nickname = mentionedUser.nickname;
        }
        var reqEmbed = {
            author: {
                name: `${mentionedUser.username}#${mentionedUser.discriminator}`,
                icon_url: mentionedUser.avatarURL,
            },
            thumbnail: {url: mentionedUser.avatarURL},
            title: "**User Information**",
            fields: [
                {
                    name: "Mention",
                    value: `<@${mentionedUser.id}>`
                },
                {
                    name: "Nickname",
                    value: nickname,
                },
                {
                    name: "Is Bot",
                    value: mentionedUser.bot,
                },
                {
                    name: "Joined Server",
                    value: `${moment(guildScopeMember.joinedAt).format('D MMM YYYY')} at ${moment(guildScopeMember.joinedTimestamp).format('h:mm A [UTC]Z')}`
                },
                {
                    name: "Account Creation Date",
                    value: moment(mentionedUser.createdAt).format("D MMM YYYY [at] h:mm A [UTC]Z"), 
                    
                }
            ],
            footer: {
                text: `User ID: ${mentionedUser.id}`,
            }
    
        }
        if (args[0] !== '-h') {
            message.channel.send({embed: reqEmbed});
        }
    }
}
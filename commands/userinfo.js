const moment = require('moment');
module.exports = {
    name: 'userinfo',
    description: "Get information about a user's account.",
    execute(message, args, mentionedUser) {
                if (args[0] === '-h') {
            var reqEmbed = {
                title: "Command: userinfo",
                color: 0x24ACF2,
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
        var userPerms = mentionedUser.permissions.toArray().sort(function (a, b) {
            if (a < b) return -1;
            else if (a > b) return 1;
            return 0;
        });
        var unnededPerms = ['ADD_REACTIONS','ATTACH_FILES','CHANGE_NICKNAME','CONNECT','CREATE_INSTANT_INVITE','DEAFEN_MEMBERS','EMBED_LINKS','MANAGE_EMOJIS','MOVE_MEMBERS','MUTE_MEMBERS','PRIORITY_SPEAKER','READ_MESSAGE_HISTORY','SEND_MESSAGES','SEND_TTS_MESSAGES','SPEAK','STREAM','USE_EXTERNAL_EMOJIS','USE_VAD','VIEW_AUDIT_LOG','VIEW_CHANNEL','VIEW_GUILD_INSIGHTS']
        var userPerms = userPerms.filter(f => !unnededPerms.includes(f));
        if (userPerms.length === 0) {
            userPerms = "None"
        } else {
            userPerms = userPerms.join(", ").replace(/_/g, ' ').toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ').replace("Add Reactions, ", "").replace("Attach Files,", "").replace();
        }

        if (moment(mentionedUser.joinedTimestamp).format('Z').includes("05:00")) {
            var joinedAtTimeZone = "CDT";
        }
        else if (moment(mentionedUser.joinedTimestamp).format('Z').includes("06:00")) {
            var joinedAtTimeZone = "CST"
        }


        if (moment(mentionedUser.user.createdAt).format("Z").includes("05:00")) {
            var createdAtTimeZone = "CDT"
        }
        else if (moment(mentionedUser.user.createdAt).format("Z").includes("06:00")) {
            var createdAtTimeZone = "CST"
        }
        if (mentionedUser.id === message.guild.ownerID) {
            var serverAcknowledgements = "Server Owner"
        } else if (mentionedUser.hasPermission("ADMINISTRATOR")) {
            var serverAcknowledgements = "Administrator"
        } else {
            var serverAcknowledgements = "Member"
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
            if (moment(mentionedUser.premiumSinceTimestamp).format("Z").includes("05:00")) {
                var boostStatus = moment(mentionedUser.premiumSinceTimestamp).format("D MMM YYYY [at] h:mm A") + " CDT"
            }
            else if (moment(mentionedUser.premiumSinceTimestamp).format("Z").includes("06:00")) {
                var boostStatus = moment(mentionedUser.premiumSinceTimestamp).format("D MMM YYYY [at] h:mm A") + " CST"
            }
        }

        var reqEmbed = {
            author: {
                name: `${mentionedUser.user.tag}`,
                icon_url: mentionedUser.user.avatarURL({format: 'webp', dynamic: true, size: 1024}),
            },
            thumbnail: {url: mentionedUser.user.avatarURL({format: 'webp', dynamic: true, size: 1024})},
            title: "**User Information**",
            color: 0x24ACF2,
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
                    name: "Joined Server",
                    value: `${moment(mentionedUser.joinedAt).format('D MMM YYYY [at] h:mm A')} ${joinedAtTimeZone}`,
                    inline: true
                },
                {
                    name: "Account Creation Date",
                    value: `${moment(mentionedUser.user.createdAt).format("D MMM YYYY [at] h:mm A")} ${createdAtTimeZone}`,
                    inline: true
                    
                },
                {
                    name: "Server Boost Date",
                    value: boostStatus
                },
                {
                    name: "Is Bot",
                    value: `${(mentionedUser.user.bot.toString()).charAt(0).toUpperCase()}${mentionedUser.user.bot.toString().slice(1)}`,
                },
                {
                    name: "Significant Permissions",
                    value: userPerms
                },
                {
                    name: "Server Relation",
                    value: serverAcknowledgements
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
import Discord = require('discord.js');

export const name = 'userinfo';
export const description = "Display information about a user";
export function execute(message: Discord.Message, args: string[], mentionedUser: Discord.GuildMember, client: Discord.Client) {
    if (args[0] === '-h') {
        let helpEmbed = {
            author: {
                name: client.user.username,
                icon_url: client.user.displayAvatarURL(),
            },
            title: "Userinfo",
            color: 0x24ACF2,
            description: this.description,
            fields: [
                {
                    name: "Syntax",
                    value: "`!userinfo <user>`"
                },
                {
                    name: "Arguments",
                    value: "`@user` or `UserID`\nIf no user is specified, information will be listed for the sender of the message."
                },
                {
                    name: "Examples",
                    value: "!userinfo @user\n!userinfo 123456789098765432"
                }
            ]
        };
        message.channel.send({ embed: helpEmbed });
        return;
    }
    let userTotalPerms = mentionedUser.permissions.toArray().sort((a, b) => {
        if (a < b)
            return -1;
        else if (a > b)
            return 1;
        return 0;
    });
    let unnededPerms = ['ADD_REACTIONS', 'ATTACH_FILES', 'CHANGE_NICKNAME', 'CONNECT', 'CREATE_INSTANT_INVITE', 'DEAFEN_MEMBERS', 'EMBED_LINKS', 'MANAGE_EMOJIS', 'MOVE_MEMBERS', 'MUTE_MEMBERS', 'PRIORITY_SPEAKER', 'READ_MESSAGE_HISTORY', 'SEND_MESSAGES', 'SEND_TTS_MESSAGES', 'SPEAK', 'STREAM', 'USE_EXTERNAL_EMOJIS', 'USE_VAD', 'VIEW_AUDIT_LOG', 'VIEW_CHANNEL', 'VIEW_GUILD_INSIGHTS'];
    let userPerms: string | Discord.PermissionString[] = userTotalPerms.filter((f: string) => !unnededPerms.includes(f));
    let permAmount = userPerms.length;
    userPerms = userPerms.length === 0 ? "None" : userPerms.join(", ").replace(/_/g, ' ').toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ').replace("Add Reactions, ", "").replace("Attach Files,", "");

    if (mentionedUser.id === message.guild.ownerID) {
        var serverAcknowledgements = "Server Owner";
        if (mentionedUser.id === '245047280908894209') {
            serverAcknowledgements = `Server Owner, ${client.user.username} Developer`;
        }
    }
    else if (mentionedUser.hasPermission("ADMINISTRATOR")) {
        var serverAcknowledgements = "Administrator";
        if (mentionedUser.id === '245047280908894209') {
            serverAcknowledgements = `Administrator, ${client.user.username} Developer`;
        }
    }
    else {
        var serverAcknowledgements = "Member";
        if (mentionedUser.id === '245047280908894209') {
            serverAcknowledgements = `Member, ${client.user.username} Developer`;
        }
    }


    if (mentionedUser.premiumSinceTimestamp === null || mentionedUser.premiumSinceTimestamp === 0) {
        var boostStatus = "Not Boosting";
    }
    else {
	var boostStatus = `<t:${Math.round(mentionedUser.premiumSinceTimestamp / 1000)}:f>`
    }
    let memberRoles = mentionedUser.roles.cache.map(role => role.id).length - 1 === 0 ? "None" : mentionedUser.roles.cache.map(roles => roles).sort((a, b) => b.rawPosition - a.rawPosition).join(' ').replace("@everyone", "");

    var reqEmbed = {
        author: {
            name: `${mentionedUser.user.tag}`,
            icon_url: mentionedUser.user.displayAvatarURL({ format: 'png', dynamic: false, size: 256 })
        },
        thumbnail: { url: mentionedUser.user.displayAvatarURL({ format: 'webp', dynamic: false, size: 512 }) },
        title: `${mentionedUser.id === "245047280908894209" ? "<:kidhat:807485094906429451> User Information" : "User Information"}`,
        color: 0x24ACF2,
        fields: [
            {
                name: "Mention",
                value: `<@${mentionedUser.user.id}>`
            },
            {
                name: "Nickname",
                value: mentionedUser.nickname === null ? "None" : mentionedUser.nickname
            },
            {
                name: "Joined Server",
                value: `<t:${Math.round(mentionedUser.joinedTimestamp / 1000)}:f>`,
                inline: true
            },
            {
                name: "Account Creation Date",
                value: `<t:${Math.round(mentionedUser.user.createdTimestamp / 1000)}:f>`,
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
                name: `Roles (${mentionedUser.roles.cache.map(role => role.id).length - 1})`,
                value: memberRoles
            },
            {
                name: `Significant Permissions (${permAmount})`,
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

    };
    message.channel.send({ embed: reqEmbed });
}

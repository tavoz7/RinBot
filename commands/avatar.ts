import Discord = require('discord.js');
export const name = "avatar";
export const description = "Display a user's avatar";
export function execute(message: Discord.Message, args: string[], mentionedUser: Discord.User, client: Discord.Client) {
    if (args[0] === '-h') {
        var helpEmbed = {
            author: {
                name: client.user.username,
                icon_url: client.user.displayAvatarURL(),
            },
            title: "Avatar",
            color: 0x24ACF2,
            description: description,
            fields: [
                {
                    name: "Syntax",
                    value: "`!avatar <user> <type>`"
                },
                {
                    name: "Arguments",
                    value: "`user (@mention or User ID)`\nIf no user is specified, the avatar of the command invoker will be sent.\n`type (png, gif or webp)`\n PNG will be selected by default if an image format is not specified."
                },
                {
                    name: "Examples",
                    value: "!avatar @user\n!avatar 123456789098765432"
                }
            ]
        }
        message.channel.send({embed: helpEmbed});
    }
    else if (message.mentions.users.first() !== undefined) {
        if (args.length === 2) {
            var reqType = args[1];
        }
        else if (args.length === 1) {
            var reqType = 'png';
        }
    } else if (args.length === 2) {
        var reqType = args[1];
    } else {
        var reqType = 'png';
    }
    if (reqType === 'png' || reqType === 'gif' || reqType === 'webp') {
    }
    else {
        return;
    }
    var reqEmbed = {
        author: {
            name: `${mentionedUser.tag}`,
            icon_url:  mentionedUser.displayAvatarURL({format: 'png', dynamic: false}),
        },
        title: "Avatar",
        color: 0x24ACF2,
        image: {
            url:  mentionedUser.displayAvatarURL({format: reqType, dynamic: false, size: 1024})
        }
    }
    message.channel.send({embed: reqEmbed});
}

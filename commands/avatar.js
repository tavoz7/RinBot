module.exports = {
    name: "avatar",
    description: "avatar",
    execute(message, args, mentionedUser, client) {
        if (args[0] === '-h') {
            var reqEmbed = {
                author: {
                    name: client.user.username,
                    icon_url: client.user.avatarURL(),
                },
                title: "**Avatar**",
                color: 0x24ACF2,
                description: "Display a user's avatar",
                fields: [
                    {
                        name: "Syntax",
                        value: "`!avatar <user> <type>`"
                    },
                    {
                        name: "Arguments",
                        value: "`user (@mention or User ID)`\nIf no user is specified, the avater of the command invoker will be sent.\n`type (png, gif or webp)`\n PNG will be selected by default if an image format is not specified."
                    },
                    {
                        name: "Examples",
                        value: "!avatar @user\n!avatar 123456789098765432"
                    }
                ]
            }
            message.channel.send({embed: reqEmbed});
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
                icon_url: mentionedUser.avatarURL({format: 'webp', dynamic: false}),
            },
            title: "Avatar",
            color: 0x24ACF2,
            image: {
                url: mentionedUser.avatarURL({format: reqType, dynamic: true, size: 1024})
            }
        }
        message.channel.send({embed: reqEmbed});
    }
}
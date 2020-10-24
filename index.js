const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const moment = require('moment');
const rin = 0x395F85;

client.on('message', function(message) {
    if (!message.guild) return;
    if(message.content == '!rule respect' && message.member.roles.find(r => r.id === '766858374377504818') || message.member.roles.find(r => r.id === '769299680357122088') && message.guild === true) {
        message.delete();
        var reqEmbed = {
            title: "BE RESPECTFUL",
            description: "Always be respectful to Moderator and our server members. Avoid starting unnessecary drama and toxicity.",
            // timestamp = new Date(),
            footer: {
                text: "Read #rules-and-info for more info.",
                icon_url: mesaage.guild.iconURL,
            }
        }
        message.channel.send({ embed: reqEmbed });
    } 
    else if (message.content == '!rule spoilers' && message.member.roles.find(r => r.id == '766858374377504818') || message.member.roles.find(r => r.id === '769299680357122088')) {
        message.delete();
        var reqEmbed = {
            title: "USE SPOILERS RESPECTIVELY",
            description: "Use spoilers for new content posted to ensure that you do not spoil things for others. In addition, do not use spoilers to imply innapropriate content.",
            footer: {
                text: "Read #rules-and-info for more info.",
                icon_url: message.guild.iconURL,
            }
        }
        message.channel.send({ embed: reqEmbed });
    }
    else if (message.content.startsWith('!userinfo') === true && message.mentions.users.size) { // TODO: scream
        // console.log(message.mentions.users.first());
        var mentionedUser = message.mentions.users.first();
        var guildScopeUser = message.member;
        if (guildScopeUser.nickname === null) {
            var nickname = "None";
        } else {
            nickname = guildScopeUser.nickname;
        }
        var reqEmbed = {
            color: rin,
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
                    value: `${moment(message.member.joinedAt).format('D MMM YYYY')} at ${moment(message.member.joinedTimestamp).format('h:mm A [UTC]Z')}`
                },
                {
                    name: "Account Creation Date",
                    value: moment(mentionedUser.createdAt).format("D MMM YYYY [at] h:mm A [UTC]Z"), 
                    
                }
            ],
            footer: {
                text: `User ID: ${mentionedUser.id}`,
                // icon_url: message.guild.iconURL,
            }
    
        }
        
        message.channel.send({embed: reqEmbed});
    } else if (message.content.startsWith('!userinfo') === true && !message.mentions.users.size) {
        var mentionedUser = message.author;
        var guildScopeUser = message.member;
        if (guildScopeUser.nickname === null) {
            var nickname = "None";
        } else {
            nickname = guildScopeUser.nickname;
        }
        var reqEmbed = {
            color: rin,
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
                    value: `${moment(message.member.joinedAt).format('D MMM YYYY')} at ${moment(message.member.joinedTimestamp).format('h:mm A [UTC]Z')}`
                },
                {
                    name: "Account Creation Date",
                    value: moment(mentionedUser.createdAt).format("D MMM YYYY [at] h:mm A [UTC]Z"), 
                    
                }
            ],
            footer: {
                text: `User ID: ${mentionedUser.id}`,
                // icon_url: message.guild.iconURL,
            }
    
        }
        message.channel.send({embed: reqEmbed});
    } else if (message.content == '!serverinfo') {
        var reqEmbed = {
            color: rin,
            author: {
                name: message.guild.name,
                icon_url: message.guild.iconURL,
            },
            title: "**Server Information**",
            thumbnail: {url: message.guild.iconURL},
            fields: [
                {
                    name: "Server Owner",
                    value: `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`,
                },
                {
                    name: "Server Creation Date",
                    value: moment(message.guild.createdAt).format("D MMM YYYY [at] h:mm A [UTC]Z"),
                },
                {
                    name: "Server Region",
                    value: message.guild.region,
                },
                {
                    name: "Member Count",
                    value: message.guild.memberCount,
                },
            ],
            footer: {
                text: `Guild ID: ${message.guild.id}`
            }
        }
        message.channel.send({embed: reqEmbed});
    }
});

client.on("ready", () =>{ // bot custom status
    console.log(`Logged in as ${client.user.tag}`);
    client.user.setPresence({
        status: "online",  // You can show online, idle, dnd
        game: {
            name: "the campfire crackle",  // The message shown
            type: "Listening" // PLAYING, WATCHING, LISTENING, STREAMING
        }
    });
 });

 client.login(config.token);

const Discord = require('discord.js');
const client = new Discord.Client();
const serverIcon = 'https://cdn.discordapp.com/icons/685236709277040802/771cef9de1fb7c82d7ded91b06383eb1.webp?size=128'
const config = require('./config.json');

client.on('message', function(message) {
    if (!message.guild) return;
    if(message.content == '!rule respect' && message.member.roles.find(r => r.id === '766858374377504818') || message.member.roles.find(r => r.id === '769299680357122088') && message.guild === true) {
        message.delete();
        const reqEmbed = {
            title: "BE RESPECTFUL",
            description: "Always be respectful to Moderator and our server members. Avoid starting unnessecary drama and toxicity.",
            // timestamp = new Date(),
            footer: {
                text: "Read #rules-and-info for more info.",
                icon_url: serverIcon
            }
        }
        message.channel.send({ embed: reqEmbed });
    } 
    else if (message.content == '!rule spoilers' && message.member.roles.find(r => r.id == '766858374377504818') || message.member.roles.find(r => r.id === '769299680357122088')) {
        message.delete();
        const reqEmbed = {
            title: "USE SPOILERS RESPECTIVELY",
            description: "Use spoilers for new content posted to ensure that you do not spoil things for others. In addition, do not use spoilers to imply innapropriate content.",
            footer: {
                text: "Read #rules-and-info for more info.",
                icon_url: serverIcon
            }
        }
        message.channel.send({ embed: reqEmbed });
    }
    else if (message.content.startsWith('!userinfo') === true && message.mentions.users.size) { // TODO: scream
        console.log(message.mentions.users.first());
        var mentionedUser = message.mentions.users.first();
        console.log(mentionedUser);
        var reqEmbed = {
            color: 0x395F85,
            title: `${mentionedUser.username}#${mentionedUser.discriminator} (${mentionedUser.id})`,
            thumbnail: {url: mentionedUser.avatarURL},
            // thumbnail: {url: }
        }
        message.channel.send({embed: reqEmbed});
    } else if (message.content.startsWith('!userinfo') === true && !message.mentions.users.size) {
        var mentionedUser = message.author;
        // console.log(mentionedUser.avatarURL);
        var reqEmbed = {
            color: 0x395F85,
            title: `${mentionedUser.username}#${mentionedUser.discriminator} (${mentionedUser.id})`,
            thumbnail: {url: mentionedUser.avatarURL},
        }
        message.channel.send({embed: reqEmbed});
    }
});

client.on("ready", () =>{
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
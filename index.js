const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const fs = require('fs');

const { prefix, token, lastChannelID, updateInProgress, lastClientMessageID } = require('./config.json');
var version = "0.8.1 - Pre-Release";
var versionDate = "11 November 2020";
const configFile = './config.json';
const file = require(configFile);

// that one color i need: 0x395F85;

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')); // add command files to array as dependencies

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('message', (message) => { // fires whenever a message is sent
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    if (message.member.roles.cache.has('685237145052512321') /* head mods */ || message.member.roles.cache.has('769013132541558795') /* mods */ || message.member.roles.cache.has('582984530848251939') /* sea of voices */ || message.member.roles.cache.has('766858374377504818') /* bot testing lounge - new role */ || message.member.roles.cache.has('713050424067883089') /* the phoenix den - RTX ON */)
    {
        // I couldn't get it to work when evaluating to false so an empty result on true works
    }
    else {
        return;
    }

    const args = message.content.slice(prefix.length).trim().split(/ +/); // stuff to throw arguments into an array
    const command = args.shift().toLowerCase(); // extract command from message

    if (command === 'rule') {
        client.commands.get('rule').execute(message, args, client);
    }
    else if (command === 'userinfo') {
        var mentionedUser = message.guild.member(message.mentions.users.first());
        if (args.length === 0 &&  message.mentions.users.first() === undefined) { // stuff for determining who's info to pull up
            mentionedUser = message.member;
            client.commands.get('userinfo').execute(message, args, mentionedUser, client);
        }
        else if (args[0] === "-h") {
            client.commands.get('userinfo').execute(message, args, null, client)
        }
        else if (args.length === 1 && message.mentions.users.first() === undefined) {
            mentionedUser = message.guild.members.fetch(args[0]).then(mentionedUser => client.commands.get('userinfo').execute(message, args, mentionedUser))
        }
        else {
            client.commands.get('userinfo').execute(message, args, mentionedUser);
        }
    }
    else if (command === 'serverinfo') {
        client.commands.get('serverinfo').execute(message, args, client);
    }
    else if (command === 'random') {
        client.commands.get('random').execute(message, args, client);
    }
    else if (command === 'about') {
        client.commands.get('about').execute(message, client, version, versionDate);
    }
    else if (command === 'host') { // me only
        client.commands.get('host').execute(message, client);
    }
    else if (command === 'update') { // me only
        client.commands.get('update').execute(message, client, configFile, file, version);
    }
    else if (command === 'help') {
        client.commands.get('help').execute(message, prefix, client);
    }
    else if (command === 'execute') {
        if (message.author.id !== "245047280908894209") return;
        client.commands.get('execute').execute(message, args)
    }
    else if (command === 'avatar') {
        if (args[0] === '-h') {
            client.commands.get('avatar').execute(message, args, null, client);
        }
        else {
            var mentionedUser = message.mentions.users.first();
            if (args[0] === 'webp' || args[0] === 'png') {
                mentionedUser = message.author;
                client.commands.get('avatar').execute(message, args, mentionedUser);
            }
            else if (mentionedUser !== undefined) {
                client.commands.get('avatar').execute(message, args, mentionedUser);
            }
            else if (mentionedUser === undefined && args.length === 0) {
                mentionedUser = message.author;
                client.commands.get('avatar').execute(message, args, mentionedUser);
                }
            else if (mentionedUser === undefined && args.length > 0 && args.length < 3) {
                mentionedUser = message.guild.members.fetch(args[0]).then(mentionedUser => client.commands.get('avatar').execute(message, args, mentionedUser.user ));
            }
            else if (args.length >= 3) {
                var reqEmbed = {
                    color: 0xD72D42,
                    description: ":x: Too many arguments supplied."
                }
                message.channel.send({embed: reqEmbed});
            }
        }
    }
});

client.once("ready", () => { // bot custom status
    console.log(`Logged in as ${client.user.tag}`);
    client.user.setActivity("the campfire crackle", {type: "LISTENING"});
    if (updateInProgress === true) {
        var reqEmbed = {
            title: "Update Complete!",
            color: 0x77B255,
            description: `:white_check_mark: Version ${version}`,
            timestamp: new Date()
        }

        client.channels.fetch(lastChannelID).then(channel => channel.messages.fetch(lastClientMessageID).then(message => message.delete()));
        client.channels.fetch(lastChannelID).then(channel => channel.send({embed: reqEmbed}));

        // client.channels.fetch(lastChannelID).then(channel => channel.messages.fetch(lastClientMessageID).then(message => message.edit({embed: reqEmbed})));

        file.updateInProgress = false;
        file.lastChannelID = null;
        file.lastClientMessageID = null;

        fs.writeFile(configFile, JSON.stringify(file, null, 2), function writeJSON(error) {
            if (error) {
                var reqEmbed = {
                    color: 0xD72D42,
                    title: "Error Writing JSON",
                    description: "```" + error + "```",
                    timestamp: new Date()
                }
                client.channels.fetch(lastChannelID).then(channel => channel.send({embed: reqEmbed}));
                console.error(error);
            }
            // please for the love of god add error handling here, if this fails the entire thing crashes on startup which results in pm2 having a fit
        });
    }
 });

 client.login(token); // makes stuff work

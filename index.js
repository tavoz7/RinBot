const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const fs = require('fs');

const { prefix, token, lastChannelID } = require('./config.json');
var { updateInProgress, lastClientMessageID } = require('./config.json');
var version = "0.5.3.4 - Pre-Release";
var versionDate = "1 November 2020";
const configFile = './config.json';
const file = require(configFile);

// that one color i need: 0x395F85;

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')); // add command files to array as dependencies

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
    
}
client.on('message', function(message) { // fires whenever a message is sent
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    if (message.member.roles.cache.has('685237145052512321') /* head mods */ || message.member.roles.cache.has('769013132541558795') /* mods */ || message.member.roles.cache.has('582984530848251939') /* sea of voices */ || message.member.roles.cache.has('766858374377504818') /* bot testing lounge - new role */ || message.member.roles.cache.has('713050424067883089') /* the phoenix den - RTX ON */) 
    { 
        // I couldn't get it to work when evaluating to false so an empty result on true works
    } 
    else { 
        return; 
    }

    const args = message.content.slice(prefix.length).trim().split(/ +/); // stuff to throw arguments into an array
    const command = args.shift().toLowerCase(); // set command to the correct .js file as a dependency whenever a command is invoked

    if(command === 'rule') {
        client.commands.get('rule').execute(message, args);
    } 
    else if (command === 'userinfo') {
        client.commands.get('userinfo').execute(message, args);
    } 
    else if (command === 'serverinfo') {
        client.commands.get('serverinfo').execute(message, args, client);
    } 
    else if (command === 'random') {
        client.commands.get('random').execute(message, args);
    }
    else if (command === 'about') {
        client.commands.get('about').execute(message, client, version, versionDate);
    }
    else if (command === 'host') {
        client.commands.get('host').execute(message, client); // me only
    }
    else if (command === 'update') { // me only
        client.commands.get('update').execute(message, client, configFile, file, version);
    }
    else if (command === 'help') {
        client.commands.get('help').execute(message, prefix, client);
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

        file.updateInProgress = false;
        file.lastChannelID = null;
        file.lastClientMessageID = null;

        fs.writeFile(configFile, JSON.stringify(file, null, 2), function writeJSON(err) {
            if (err) throw (err);
        });
    }
 });

 client.login(token); // makes stuff work

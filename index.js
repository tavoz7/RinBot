const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const fs = require('fs');
const os = require('os');
const { exec } = require("child_process");
require('loadavg-windows');

const { prefix, token, lastChannelID } = require('./config.json');
var { updateInProgress, lastClientMessageID } = require('./config.json');
var version = "0.5.2 - Pre-Release";
var versionDate = "29 October 2020";
const configFile = './config.json';
const file = require(configFile);
const guild = new Discord.Guild()

// that one color i need: 0x395F85;

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')); // add command files to array as dependencies

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}
client.on('message', function(message) { // fires whenever a message is sent
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    if (message.member.roles.cache.has('685237145052512321') /* head mods */ || message.member.roles.cache.has('769013132541558795') /* mods */ || message.member.roles.cache.has('582984530848251939') /* sea of voices */ || message.member.roles.cache.has('766858374377504818'))  /* bot testing lounge - new role */ 
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
        client.commands.get('host').execute(message, args, os, client); // me only
    }
    else if (command === 'update') { // me only
        if (message.author.id !== '245047280908894209') {
            var reqEmbed = {
                color: 0xD72D42,
                description: ":x: You don't have permission to do that."
            }
            message.channel.send({embed: reqEmbed});
            return;
        }
        exec("git pull", (error, stdout) => {
            if (stdout.includes("file changed") === false || stdout.includes("files changed") === false /*|| stderr.includes("origin/master" === false) */) {
                if (error) {
                    var reqEmbed = {
                        title: "Update",
                        color: 0xD72D42,
                        description: "`" + error + "`",
                        timestamp: new Date()
                    }
                    message.channel.send({embed: reqEmbed});
                    return;
                }
                /* if (stderr) {
                    var reqEmbed = {
                        title: "Update",
                        color: 0xD72D42,
                        description: "`" + stderr + "`",
                        timestamp: new Date()
                    }
                    message.channel.send({embed: reqEmbed})
                    return;
                }*/
            }
            if (stdout.includes("Already up to date.")) {
                var reqEmbed = {
                    title: "Update",
                    description: ":white_check_mark: Already up to date.",
                    color: 0x77B255,
                    footer: {text: `Version ${version}`}
                }
                message.channel.send({embed: reqEmbed});
                return;
            } 
            else {
                var reqEmbed = {
                    title: "Update in Progress",
                    color: 0xFFCC4D,
                    description: ":arrows_counterclockwise: Restarting to install update...",
                    timestamp: new Date()
                }
                message.channel.send({embed: reqEmbed})
                // Write to config.json to notify the bot upon restart that an update was applied, and where to delete the restart message then replace it with the update complete message
                file.updateInProgress = true;
                file.lastChannelID = message.channel.id;
                setTimeout(() => { file.lastClientMessageID = client.user.lastMessageID; }, 1500);
                setTimeout(() => { fs.writeFile(configFile, JSON.stringify(file, null, 2), function writeJSON(err) { if (err) throw (err); }) }, 2500);
                // please for the love of god add error handling here
                setTimeout(() => {  process.exit(); }, 3000);
            }
        });       
    }
    else if (command === 'help') {
        client.commands.get('help').execute(message, prefix, client);
    }
}); 

client.once("ready", () => { // bot custom status
    console.log(`Logged in as ${client.user.tag}`);
    client.user.setActivity("to the campfire crackle", {type: "LISTENING"});
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
        file.lastChannelID = "";
        file.lastClientMessageID = "";

        fs.writeFile(configFile, JSON.stringify(file, null, 2), function writeJSON(err) {
            if (err) throw (err);
        })
    }
 });

 client.login(token); // makes stuff work

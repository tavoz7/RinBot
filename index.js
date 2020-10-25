const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const fs = require('fs');
const {prefix, token} = require('./config.json')

// that one colour i need: 0x395F85;

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')); // add command files to array as dependencies


for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}
client.on('message', function(message) { // fires whenever a message is sent
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/); // stuff to throw arguments into an array
    const command = args.shift().toLowerCase(); // set command to the correct .js file as a dependency whenever a command is invoked

    if(command === 'rule') {
        client.commands.get('rule').execute(message, args)
    } 
    else if (command === 'userinfo') {
        client.commands.get('userinfo').execute(message, args)
    } 
    else if (command === 'serverinfo') {
        client.commands.get('serverinfo').execute(message, args)
    } 
    else if (command === 'random') {
        client.commands.get('random').execute(message, args)
    }
});

client.on("ready", () => { // bot custom status
    console.log(`Logged in as ${client.user.tag}`);
    client.user.setPresence({
        status: "online",  // You can show online, idle, dnd
        game: {
            name: "the campfire crackle",  // The message shown
            type: "Listening" // PLAYING, WATCHING, LISTENING, STREAMING
        }
    });
 });

 client.login(token); // makes stuff work

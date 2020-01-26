const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = 'token'

bot.on('message', function(message){
    if(message.content == 'Lucas')
    {
        message.reply("Lucas? More like Lickass")
    }
});

bot.on('message', function(message){
    if(message.content == 'lucas')
    {
        message.reply("Lucas? More like Lickass")
    }
})

bot.login('token');

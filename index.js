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

//bot.on('message', function(message){
//	if(message.content == 'daunte')
//	{
//		message.reply("Daunte? More like Cuntae")
//	}
//});
//REMEMBER THE SEMICOLON

//bot.on('message', function(message){
//	if(message.content == 'Daunte')
//	{
//		message.reply("Daunte? More like Cuntae")
//	}
//})
//REMEMBER THE SEMICOLON

//bot.on('message', function(message){
//    if(message.author.username == 'Lucas')
//    {
//        message.reply("Lucas? More like Lickass")
//    }
//});
//REMEMBER THE SEMICOLON

//bot.on('message', function(message){
//    if(message.author.username == 'CominAtYou')
//    {
//        message.reply("I'm **cominatyou** with this message")
//    }
//})

bot.login('token');

const Discord = require('discord.js');
const client = new Discord.Client();
const TOKEN = 'token'

client.on('message', function(message){
    if(message.content == 'Lucas')
    {
        message.channel.output("Lucas? More like Lickass")
    }
});

client.on('message', function(message){
	if(message.content == 'lucas')
	{
		message.channel.output("Lucas? More like Lickass")
	}
})
// Remember the semicolon if you are adding more functions under this one; if thre are none under this one, delete it.

client.on('message', function(message){
  if(message.content == 'daunte')
	{
		message.channel.output("Daunte? More like Cuntae")
	}
});
// Remember the semicolon if you are adding more functions under this one; if thre are none under this one, delete it.

client.on('message', function(message){
  if(message.content == 'Daunte')
	{
		message.channel.output("Daunte? More like Cuntae")
	}
 });
// Remember the semicolon if you are adding more functions under this one; if thre are none under this one, delete it.

client.on('message', function(message){
    if(message.author.username == 'Lucas')
    {
        message.channel.output("Lucas? More like Lickass")
    }
});

client.login('token');

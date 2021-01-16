import Discord = require('discord.js');
export const name = "ping";
export const description = "";
export function execute(message: Discord.Message, client: Discord.Client) {
    var reqEmbed = {
        title: ":ping_pong: Pong!",
        description: `Bot latency is ${new Date().getTime() - message.createdTimestamp} ms\nDiscord API latency is ${Math.round(client.ws.ping)} ms`,
        color: 0x24ACF2,
        timestamp: new Date()
    }
    message.channel.send({embed: reqEmbed});
}
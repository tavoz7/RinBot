module.exports = {
    name: "ping",
    description: "",
    execute(message, client) {
        var reqEmbed = {
            title: "🏓 Pong!",
            description: `Bot latency is ${parseInt(message.createdTimestamp) - new Date().getTime()} ms\nDiscord API latency is ${Math.round(client.ws.ping)} ms`
        }
        message.channel.send({embed: reqEmbed});
    }
}
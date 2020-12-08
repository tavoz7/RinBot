module.exports = {
    name: "ping",
    description: "",
    execute(message, client) {
        var reqEmbed = {
            title: ":ping_pong: Pong!",
            description: `Bot latency is ${parseInt(message.createdTimestamp) - new Date().getTime()} ms\nDiscord API latency is ${Math.round(client.ws.ping)} ms`,
            color: 0x24ACF2,
            timestamp: new Date()
        }
        message.channel.send({embed: reqEmbed});
    }
}
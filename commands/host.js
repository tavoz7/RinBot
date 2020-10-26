const { execute } = require("./random");

module.exports = {
    name: "host",
    description: "get information about the host server.",
    execute(message, args, os, client) {
        if (message.author.id !== '245047280908894209') return;
        if (!os.version().includes("Windows")) { var host_os = 'Ubuntu 20.04.1' } else { host_os = os.version() }
        var reqEmbed = {
            author: {
                name: client.user.username,
                icon_url: client.user.avatarURL,
            },
            title: "Host Stats",
            fields: [
                {
                    name: "Current OS",
                    value: host_os,
                    inline: true,
                },
                {
                    name: "Load Average",
                    value: `${os.loadavg()[0]*10}%`,
                    inline: true,
                },
                {
                    name: "Free Memory",
                    value: `${(os.freemem().toString() / 1000000000).toFixed(2)} GB`,
                    inline: true,
                }
            ],
            timestamp: new Date()
        }
        message.channel.send({embed: reqEmbed});
    }
}
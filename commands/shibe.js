const https = require('https');
module.exports = {
    name: "shibe",
    description: "shibe shibe shibe shibe",
    execute(message) {
        const requestOptions = {
            hostname: 'shibe.online',
            port: 443,
            path: '/api/shibes?count=1&urls=true',
            method: 'GET'
        }
        const req = https.request(requestOptions, res => {
            res.on('data', d => {
                var reqEmbed = {
                    title: "Shibe",
                    color: 0x24ACF2,
                    image: {
                        url: d.toString().replace(/[\[\]"]+/g,'')
                    },
                    footer: {
                        text: "Images from shibe.online"
                    }
                }
                message.channel.send({embed: reqEmbed});
            })
        })
        req.on('error', error => {
            var reqEmbed = {
                color: 0xD72D42,
                title: "Error",
                description: "```" + error + "```",
                timestamp: new Date(),
            }
            message.channel.send({embed: reqEmbed});
            console.error(error);
        })
    req.end()
    }
}
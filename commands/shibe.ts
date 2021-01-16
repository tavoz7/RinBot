import https = require('https');
import Discord = require('discord.js');
export const name = "shibe";
export const description = "shibe shibe shibe shibe";
export function execute(message: Discord.Message) {
    const requestOptions = {
        hostname: 'shibe.online',
        port: 443,
        path: '/api/shibes?count=1&urls=true',
        method: 'GET'
    }
    const req = https.request(requestOptions, res => {
        res.on('data', d => {
            let reqEmbed = {
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
        let errorEmbed = {
            color: 0xD72D42,
            title: "Error",
            description: "```" + error + "```",
            timestamp: new Date(),
        }
        message.channel.send({embed: errorEmbed});
        console.error(error);
    })
req.end()
}
import Discord = require('discord.js');
import os = require('os');
require('loadavg-windows');

export const name = "host";
export const description = "get information about the host server.";
export function execute(message: Discord.Message, client: Discord.Client) { // TODO: Rewrite this crap
    if (message.author.id !== '245047280908894209') {
        var disallowedEmbed = {
            color: 0xD72D42,
            description: ":x: You don't have permission to do that.",
        }
        message.channel.send({embed: disallowedEmbed});
        return;
    }
    if (!os.version().includes("Windows")) {
        var host_os = 'Ubuntu 20.04.1'; // I'm too lazy to actually get distro information so this works, it'll suck when I use both arch and ubuntu
        var color = 0xDD4814;
        var percentCPU = (os.loadavg()[0]*50).toFixed(1);
        var osIcon = "https://cdn.cominatyou.com/cc38be88.png"
    }
    else {
        host_os = os.version();
        var percentCPU = (os.loadavg()[0]*10).toFixed(1);
        if (os.version().includes('Windows')) {
            var color = 0x00BCF5;
            var osIcon = 'https://cdn.cominatyou.com/cc38be89.png';
        } else {
            var osIcon = client.user.avatarURL();
        }
    }
    freeMem = (os.freemem() / 1000000000).toFixed(2)
    if (os.freemem() < 1000000000) {
        var unit = 'MB'
        if (host_os = 'Ubuntu 20.04.1') {
            var freeMem = (os.freemem() / 1000000).toFixed(0)
        } else if (os.version().includes("Windows")) {
            var freeMem = (os.freemem() / 1000000000).toFixed(0)
        }
    }
    else { var unit = "GB" }
    var clientUptimeSec = client.uptime / 1000;
    var clientUptimeMin = clientUptimeSec / 60;
    var clientUptimeHours = clientUptimeSec / 3600;
    var clientUptimeDays = clientUptimeSec / 86400;
    var clientUptimeDaysMod = Math.floor(clientUptimeDays % 86400) // why is JS dumb to where you can't modulo an equation

    if (clientUptimeDaysMod === 0) {
        var uptimeStr = `${Math.floor(clientUptimeHours % 24)} hr ${Math.floor(clientUptimeMin % 60)} min ${Math.floor(clientUptimeSec % 60)} sec`;
    } else if (clientUptimeDaysMod === 1) {
        var uptimeStr = `${clientUptimeDaysMod} day ${Math.floor(clientUptimeHours % 24)} hr ${Math.floor(clientUptimeMin % 60)} min ${Math.floor(clientUptimeSec % 60)} sec`;
    }
    else if (clientUptimeDaysMod % 86400 > 1) {
        var uptimeStr = `${clientUptimeDaysMod} days ${Math.floor(clientUptimeHours % 24)} hr ${Math.floor(clientUptimeMin % 60)} min ${Math.floor(clientUptimeSec % 60)} sec`;
    }
    var reqEmbed = {
        author: {
            name: client.user.username,
            icon_url: client.user.avatarURL(),
        },
        thumbnail: {url: osIcon},
        title: "**Host Stats**",
        color: color,
        fields: [
            {
                name: "Current OS",
                value: host_os,
                inline: true,
            },
            {
                name: "Load Average",
                value: `${percentCPU}%`,
                inline: true,
            },
            {
                name: "Free Memory",
                value: `${freeMem} ${unit} / ${(os.totalmem()/1000000000).toFixed(0)} GB`,
                inline: true,
            }
        ],
        footer: {
            text: `Uptime: ${uptimeStr}`
        },
        timestamp: new Date()
    }
    message.channel.send({embed: reqEmbed});
}
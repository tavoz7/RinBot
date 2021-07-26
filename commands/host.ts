import Discord = require('discord.js');
import os = require('os');
require('loadavg-windows');

export const name = "host";
export const description = "get information about the host server.";
export function execute(message: Discord.Message, client: Discord.Client) { // What the actual hell was I thinking when I wrote this
    if (message.author.id !== '245047280908894209') {
        let disallowedEmbed = {
            color: 0xD72D42,
            description: ":x: You don't have permission to do that.",
        }
        message.channel.send({embed: disallowedEmbed});
        return;
    }
    let isWindows = os.version().includes("Windows");
    // reading 'lsb_release -a | grep Description' would probably be a better idea, but then again, child_process is an absolute PAIN to work with because callback
    const hostOS = isWindows ? os.version() : "Ubuntu 20.04.2";
    const color = isWindows ? 0x00BCF5 : 0xDD4814;
    const osIcon = isWindows ? "https://cdn.cominatyou.com/assets/cc38be89.png" : "https://cdn.cominatyou.com/assets/cc38be88.png";
    const loadAvg = isWindows ? os.loadavg() : os.loadavg().map(x => x.toFixed(2));
    // get amount of free memory in gigabytes
    const freemem = os.freemem().toFixed(2);
    const totalmem = os.totalmem().toFixed(2);
    const freememGB = (+freemem / 1024 / 1024 / 1024).toFixed(2);
    const totalmemGB = Math.round(+totalmem / 1024 / 1024 / 1024);
    // get system uptime and format it as days, hours, minutes and seconds
    const uptime = os.uptime();
    const days = Math.floor(uptime / 86400);
    const hours = Math.floor((uptime % 86400) / 3600);
    const minutes = Math.floor(((uptime % 86400) % 3600) / 60);
    const seconds = Math.floor(((uptime % 86400) % 3600) % 60);
    const uptimeString = `${days > 0 ? days + "d, " : ""}${hours}h ${minutes}m ${seconds}s`;
    // compile all the information into a Discord.js Message embed
    const embed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle("Host Information")
        .setDescription(`**Host OS**: ${hostOS}`)
        .setThumbnail(osIcon)
        .addField("Load Average", `${loadAvg.join(", ")}`, true)
        .addField("Free Memory", `${freememGB} GB / ${totalmemGB} GB`, true)
        .addField("Uptime", `${uptimeString}`, true);
    message.channel.send({embed});

}

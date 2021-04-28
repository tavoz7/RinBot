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
    } else {
        let isWindows = os.version().includes("Windows")
        // reading 'lsb_release -a | grep Description' would probably be a better idea, but then again, child_process is an absolute PAIN to work with because callback
        const hostOS = isWindows ? os.version() : "Ubuntu 20.04.2";
        const color = isWindows ? 0x00BCF5 : 0xDD4814;
        const osIcon = isWindows ? "https://cdn.cominatyou.com/assets/cc38be89.png" : "https://cdn.cominatyou.com/assets/cc38be88.png";
    }
}
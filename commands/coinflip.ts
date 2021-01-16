import Discord = require('discord.js');
export const name = "coinflip";
export const description = "Flip a coin";
export function execute(message: Discord.Message) {
    let choice = Math.floor(Math.random() * 6000 - 1 + 1);
    if (choice === 420) {
        var sideEmbed = {
            color: 0x24ACF2,
            title: "The coin landed on its side!",
            description: "Wow. There's only a 0.017% chance for that to happen!"
        }
        message.channel.send({embed: sideEmbed});
    }
    else if (choice % 2 === 0) {
        message.channel.send("Heads!");
    }
    else if (choice % 2 !== 0) {
        message.channel.send("Tails!");
    }
}
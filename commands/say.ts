import Discord = require('discord.js');

export const name = "say";
export const description = "Says something via the bot";
export function execute(message: Discord.Message, args: string[]) {
    if (message.author.id !== "245047280908894209") return;
    message.delete();
    message.channel.send(args.join(" "));
    //h
}
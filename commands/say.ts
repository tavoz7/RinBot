import Discord = require('discord.js');

export const name = "say";
export const description = "Says something via the bot";
export async function execute(message: Discord.Message, client: Discord.Client, args: string[]) {
    if (message.author.id !== "245047280908894209" && message.author.id !== "247886996477837312") return;
    if (args.includes('--channel')) {
        if (/<#[0-9]{18}>/i.test(args[args.indexOf('--channel') + 1])) {
            let channel = args.pop().replace("<", "").replace("#", "").replace(">", "");
            args.pop();
            try {
                var targetChannel = await client.channels.fetch(channel);
            } catch {
                message.channel.send(":x: I don't seem to have access to that channel!");
            }
            (targetChannel as Discord.TextChannel).send(args.join(" "));
        } else {
            message.channel.send(":x: Invalid channel specified!");
        }
        message.react("👍");
    } else {
        message.delete();
        message.channel.send(args.join(" "));
    }
}

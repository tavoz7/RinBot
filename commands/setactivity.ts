import Discord = require('discord.js');
export const name = "setactivity";
export function execute(message: Discord.Message, args: string[], client: Discord.Client) {
    if (message.author.id !== "245047280908894209") return;
    if (!args.includes('--type')) {
        message.channel.send(`:x: You must specify an activity type!`);
        return;
    }
    const type = (args[args.indexOf('--type') + 1].toUpperCase() as Discord.ActivityType);
    args.splice(args.indexOf('--type'), 1);
    args.splice(args.indexOf('--type') + 1, 1);
    if (type === "PLAYING" || type === "STREAMING" || type === "LISTENING" || type === "WATCHING" || type === "COMPETING") {
        client.user.setActivity(args.join(" "), {type: type});
        message.channel.send(`:white_check_mark: Status has been set to "${type[0] + type.slice(1, type.length).toLowerCase()} ${args.join(" ")}"`);
    }
    else message.channel.send(`:x: ${type} is not a valid activity type!`);
}

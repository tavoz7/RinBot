import Discord = require('discord.js');
const codeBlue = 0x24ACF2;
export function execute(message: Discord.Message, args: string[], client: Discord.Client) {
    if (message.author.id !== "245047280908894209") return;
    const evaled = eval(args.join(" "));
    message.channel.send({
        embed: {
            title: "Eval",
            description: `\`\`\`${evaled === undefined ? "Void" : evaled}\`\`\``,
            color: codeBlue
        }
    });
}

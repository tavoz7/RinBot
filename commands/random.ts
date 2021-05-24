import Discord = require('discord.js');

export const name = "random";
export const description ="Generate a random number";
export function execute(message: Discord.Message, args: string[], client: Discord.Client) {
    if (args.length === 0) {
        message.channel.send(Math.floor((Math.random() * (Number.MAX_SAFE_INTEGER - 1) - 1) + 1));
    }
    else if (args[0] === '-h') {
        let helpEmbed = {
            author: {
                name: client.user.username,
                icon_url: client.user.displayAvatarURL(),
            },
            title: "Random",
            description: "Generate a random number",
            color: 0x24ACF2,
            fields: [
                {
                    name: "Syntax",
                    value: "`!random <min> <max>`\nIf no arguments are supplied, a number is randomly generated up to " + (Number.MAX_SAFE_INTEGER - 1)
                },
                {
                    name: "Arguments",
                    value: "`min`, `max`"
                },
                {
                    name: "Examples",
                    value: "!random\n!random 8 1024\n"
                }
            ]
        }
        message.channel.send({embed: helpEmbed})
    }
    else if (args.length === 1 && Number.isInteger(parseInt(args[0]))) {
        let insufParamEmbed = {
            color: 0xD72D42,
            description: ":x: Not enough parameters supplied."
        }
        message.channel.send({embed: insufParamEmbed});
    }
    else if (args.length === 1 && !Number.isInteger(parseInt(args[0]))) {
        let invalidParamEmbed = {
            color: 0xD72D42,
            description: ":x: Invalid parameters supplied."
        }
        message.channel.send({embed: invalidParamEmbed});
    }
    else if (args.length > 2) {
        let tooManyParamEmbed = {
            color: 0xD72D42,
            description: ":x: Too many parameters supplied."
        }
        message.channel.send({embed: tooManyParamEmbed});
    }
    else if (Number.isNaN(parseInt(args[0])) === true || Number.isNaN(parseInt(args[1])) === true) {
        let invalidParamEmbed = {
            color: 0xD72D42,
            description: ":x: Invlid parameters supplied."
        }
        message.channel.send({embed: invalidParamEmbed});
    }
    else if (parseInt(args[0]) > (Number.MAX_SAFE_INTEGER - 1) || parseInt(args[1]) > (Number.MAX_SAFE_INTEGER - 1)) {
        let numTooLargeEmbed = {
            color: 0xD72D42,
            description: `:x: Numbers greater than ${(Number.MAX_SAFE_INTEGER - 1)} are not supported.`
        }
        message.channel.send({embed: numTooLargeEmbed});
    }
    else if (Number.isNaN(parseInt(args[0])) === false && Number.isNaN(parseInt(args[1])) === false && parseInt(args[0]) <= (Number.MAX_SAFE_INTEGER - 1) && parseInt(args[1]) <= (Number.MAX_SAFE_INTEGER - 1) && parseInt(args[0]) < parseInt(args[1])) {
        message.channel.send((Math.random() * (parseInt(args[1]) - parseInt(args[0])) + parseInt(args[0])).toFixed(0));
    }
    else if (parseInt(args [0]) > parseInt(args[1])) {
        let negativeRangeEmbed = {
            color: 0xD72D42,
            description: ":x: Minimum number cannot be greater than maximum number."
        }
        message.channel.send({embed: negativeRangeEmbed});
    }
}

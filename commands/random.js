module.exports = {
    name: "random",
    description: "Generate a random number",
    execute(message, args) {
        // console.log(Number.isNaN(args[0])); // false
        // console.log(Number.isNaN(args[1])); // false 
        // console.log(args[0] <= (Number.MAX_SAFE_INTEGER - 1)); // true
        // console.log(args[1] <= (Number.MAX_SAFE_INTEGER - 1)); // true
        // console.log(args[0] < args[1]); // true
        console
        if (args.length === 0) {
            message.channel.send((Math.random() * ((Number.MAX_SAFE_INTEGER - 1) - 1) + 1).toFixed(0));
        }
        else if (args[0] === '-h') {
            var reqEmbed = {
                title: "Command: Random",
                description: "Generate a random number",
                fields: [
                    {
                        name: "Syntax",
                        value: "`!random <min> <max>`\nIf no arguments are supplied, a number is randomly generated up to " + Number.MAX_SAFE_INTEGER
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
            message.channel.send({embed: reqEmbed})
        }
        else if (args.length === 1 && Number.isInteger(parseInt(args[0]))) {
            var reqEmbed = {
                color: 0xD72D42,
                description: ":x: Not enough parameters supplied."
            }
            message.channel.send({embed: reqEmbed});
        }
        else if (args.length === 1 && !Number.isInteger(parseInt(args[0]))) {
            var reqEmbed = {
                color: 0xD72D42,
                description: ":x: Invalid parameters supplied."
            }
            message.channel.send({embed: reqEmbed});
        }
        else if (args.length > 2) {
            var reqEmbed = {
                color: 0xD72D42,
                description: ":x: Too many parameters supplied."
            }
            message.channel.send({embed: reqEmbed});
        }
        else if (Number.isNaN(parseInt(args[0])) === true || Number.isNaN(parseInt(args[1])) === true) {
            var reqEmbed = {
                color: 0xD72D42,
                description: ":x: Invlid parameters supplied."
            }
            message.channel.send({embed: reqEmbed});
        }
        else if (parseInt(args[0] > (Number.MAX_SAFE_INTEGER - 1) || parseInt(args[1]) > (Number.MAX_SAFE_INTEGER - 1))) {
            var reqEmbed = {
                color: 0xD72D42,
                description: `:x: Numbers greater than ${(Number.MAX_SAFE_INTEGER - 1)} are not supported.`
            }
            message.channel.send({embed: reqEmbed})
        }
        else if (Number.isNaN(parseInt(args[0])) === false && Number.isNaN(parseInt(args[1])) === false && parseInt(args[0]) <= (Number.MAX_SAFE_INTEGER - 1) && parseInt(args[1]) <= (Number.MAX_SAFE_INTEGER - 1) && parseInt(args[0]) < parseInt(args[1])) {
            message.channel.send((Math.random() * (parseInt(args[1]) - parseInt(args[0])) + parseInt(args[0])).toFixed(0));
        }
        else if (parseInt(args [0]) > parseInt(args[1])) {
            var reqEmbed = {
                color: 0xD72D42,
                description: ":x: Minimum number cannot be greater than maximum number."
            }
            message.channel.send({embed: reqEmbed});
        }
    }
}
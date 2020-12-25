const https = require('https');

module.exports = {
    name: "robloxid",
    description: "",
    execute(message, args, client) {
        if (args[0] === '-h') {
            var reqEmbed = {
                author: {
                    name: client.user.username,
                    icon_url: client.user.avatarURL(),
                },
                title: "RobloxID",
                color: 0x24ACF2,
                description: "Retrieve a ROBLOX user's ID",
                fields: [
                    {
                        name: "Syntax",
                        value: "`!robloxid <username>`"
                    },
                    {
                        name: "Arguments",
                        value: "`username`"
                    },
                    {
                        name: "Examples",
                        value: "!robloxid Builderman"
                    }
                ]
            }
            message.channel.send({embed: reqEmbed});
            return;
        }
        const requestOptions = {
            hostname: 'api.roblox.com',
            port: 443,
            path: '/users/get-by-username?username=' + args[0],
            method: 'GET'
        }
        const req = https.request(requestOptions, res => {
            res.on('data', d => {
                const userJSON = JSON.parse(d);
                if (userJSON.success === false) {
                    if (userJSON.errorMessage === 'User not found') {
                        message.channel.send(":x: That user does not exist!");
                    }
                    else {
                        message.channel.send("There was an error.")
                    }
                } else {
                message.channel.send(`Roblox ID for ${userJSON.Username}: ${userJSON.Id}`);
                }
            });
        })
    req.on('error', error => {
        console.error(error);
        message.channel.send(":x: There was an error contacting the HTTP endpoint. Please try again later.");
    })
    req.end();
    }
}
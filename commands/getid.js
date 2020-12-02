const https = require('https');

module.exports = {
    name: "getid",
    description: "",
    execute(message, args, client) {
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
                message.channel.send(`Roblox ID for ${args[0]}: ${userJSON.Id}`);
                }
            });
        })
    req.on('error', error => {
        console.log(error);
    })
    req.end()
    }
}
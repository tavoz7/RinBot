const { profile } = require('console');
const https = require('https');
const moment = require('moment');
const userinfo = require('./userinfo');

module.exports = {
    name: "getprofile",
    description: "",
    execute(message, args, client) {
        function getProfileInfo(message, userJSON) {
            const requestOptions = {
                hostname: 'users.roblox.com',
                port: 443,
                path: `/v1/users/${userJSON.Id}`,
                method: 'GET'
            }
            const req = https.request(requestOptions, res => {
                res.on('data', d => {
                    const profileJSON = JSON.parse(d);
                    if (userJSON.IsOnline === false) {
                        var status = "Offline";
                    }
                    else {
                        var status = "Online";
                    }
                    var reqEmbed = {
                        author: {
                            name: "ROBLOX"
                        },
                        title: `${userJSON.Username}`,
                        url: `https://www.roblox.com/users/${userJSON.Id}/profile`,
                        thumbnail: {
                            url: `https://www.roblox.com/Thumbs/Avatar.ashx?x=500&y=500&username=${userJSON.Username}`
                        },
                        fields: [
                            {
                                name: "User ID:",
                                value: userJSON.Id,
                                inline: true
                            },
                            {
                                name: "Creation Date",
                                value: moment(profileJSON.created).format("D MMM YYYY"),
                                inline: true
                            },
                            {
                                name: "Status",
                                value: status,
                                inline: true
                            }
                        ],
                        description: profileJSON.description
                    }
                    message.channel.send({embed: reqEmbed});
                });
            });
            req.on('error', error => {
                console.log(error);
                message.channel.send(":x: There was an error contacting the HTTP endpoint. Please try again later.");
            });
            req.end();
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
                        message.channel.send("There was an error.");
                    }
                } else {
                    getProfileInfo(message, userJSON);
                }
            })
        });
        req.on('error', error => {
            console.log(error);
            message.channel.send(":x: There was an error contacting the HTTP endpoint. Please try again later.");
        });
        req.end()
    }
}
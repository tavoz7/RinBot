const { exec } = require('child_process');
const os = require('os');
const { uptime } = require('process');

module.exports = {
    name: "details",
    description: "",
    execute(message, client, versionDate, version) {
        var clientUptimeSec = client.uptime / 1000;
        var clientUptimeMin = clientUptimeSec / 60;
        var clientUptimeHours = clientUptimeSec / 3600;
        var clientUptimeDays = clientUptimeSec / 86400;
        var clientUptimeDaysMod = Math.floor(clientUptimeDays % 86400)
        if (clientUptimeDaysMod === 0) {
            var uptimeStr = `${Math.floor(clientUptimeHours % 24)} hr ${Math.floor(clientUptimeMin % 60)} min ${Math.floor(clientUptimeSec % 60)} sec`;
        } else if (clientUptimeDaysMod === 1) {
            var uptimeStr = `${clientUptimeDaysMod} day ${Math.floor(clientUptimeHours % 24)} hr ${Math.floor(clientUptimeMin % 60)} min ${Math.floor(clientUptimeSec % 60)} sec`;
        }
        else if (clientUptimeDaysMod % 86400 > 1) {
            var uptimeStr = `${clientUptimeDaysMod} days ${Math.floor(clientUptimeHours % 24)} hr ${Math.floor(clientUptimeMin % 60)} min ${Math.floor(clientUptimeSec % 60)} sec`;
        }
        exec("git show --oneline -s", (error, stdout) => {
            if (error) {
                var reqEmbed = {
                    title: "Error",
                    color: 0xD72D42,
                    description: "```" + error + "```",
                    timestamp: new Date()
                }
                message.channel.send({embed: reqEmbed});
                return;
            }
            var commitHash = stdout.split(" ")[0];
            if (os.type() === "Linux") {
                exec("apt list --upgradable | wc -l", (error, stdout) => {
                    if (error) {
                        var reqEmbed = {
                            title: "Error",
                            color: 0xD72D42,
                            description: "```" + error + "```",
                            timestamp: new Date()
                        }
                        message.channel.send({embed: reqEmbed});
                        return;
                    } else {
                        var packages = stdout;
                        var kernel = os.type();
                        exec("node -v", (error, stdout) => {
                            if (error) {
                                var reqEmbed = {
                                    title: "Error",
                                    color: 0xD72D42,
                                    description: "```" + error + "```",
                                    timestamp: new Date()
                                }
                                message.channel.send({embed: reqEmbed});
                                return;
                            } else {
                                var nodeVersion = stdout.replace("v", "").replace("\n", "");
                                if (kernel === "Windows NT") {
                                    var osFamily = "Windows";
                                    var osRelease = "10 Pro"
                                }
                                if (kernel === "Linux") {
                                    var osFamily = "Ubuntu";
                                    var osRelease = "20.04 LTS";
                                }
                                var reqEmbed = {
                                    author: {
                                        name: client.user.username,
                                        icon_url: client.user.avatarURL()
                                    },
                                    title: "Technical Details",
                                    fields: [
                                        {
                                            name: "Codebase Information",
                                            value: `[\`master/${commitHash}\`](https://github.com/CominAtYou/RinBot/commit/${commitHash})\n**Node Version**: ${nodeVersion}\n**Bot Version**: ${version.replace(" - Pre-Release", "")}\n**Build Date**: ${versionDate}`,
                                            inline: true
                                        },
                                        {
                                            name: "System Information",
                                            value: `**Kernel**: ${kernel}\n**Kernel Build**: ${os.release().replace("-generic", "").replace("-Microsoft", "")}\n**OS Family**: ${osFamily}\n**OS Version**: ${osRelease}`,
                                            inline: true,
                                        },
                                        {
                                            name: "Miscellaneous Info",
                                            value: `**Available Updates**: ${(parseInt(packages) - 1).toString()}\n**API Latency**: ${client.ws.ping} ms`,
                                            inline: true
                                        }
                                    ],
                                    color: 0x24ACF2,
                                    footer: {
                                        text: "Uptime: " + uptimeStr
                                    }
                                }
                                message.channel.send({embed: reqEmbed})
                            }
                        })
                    }
                })
            }
            else if (os.type() === 'Windows_NT') {
                var packages = "None"
                var kernel = "Windows NT";
                exec("node -v", (error, stdout) => {
                    if (error) {
                        var reqEmbed = {
                            title: "Error",
                            color: 0xD72D42,
                            description: "```" + error + "```",
                            timestamp: new Date()
                        }
                        message.channel.send({embed: reqEmbed});
                        return;
                    } else {
                        var nodeVersion = stdout.replace("v", "").replace("\n", "");
                        if (kernel === "Windows NT") {
                            var osFamily = "Windows";
                            var osRelease = "10 Pro"
                        }
                        if (kernel === "Linux") {
                            var osFamily = "Ubuntu";
                            var osRelease = "20.04 LTS";
                        }
                        var reqEmbed = {
                            author: {
                                name: client.user.username,
                                icon_url: client.user.avatarURL()
                            },
                            title: "Technical Details",
                            fields: [
                                {
                                    name: "Codebase Information",
                                    value: `**Commit**: [\`master/${commitHash}\`](https://github.com/CominAtYou/RinBot/commit/${commitHash})\n**Node Version**: ${nodeVersion}\n**Bot Version**: ${version.replace(" - Pre-Release", "")}\n**Build Date**: ${versionDate}`,
                                    inline: true
                                },
                                {
                                    name: "System Information",
                                    value: `**Kernel**: ${kernel}\n**Kernel Build**: ${os.release().replace("-generic", "")}\n**OS Family**: ${osFamily}\n**OS Version**: ${osRelease}`,
                                    inline: true,
                                },
                                {
                                    name: "Miscellaneous Info",
                                    value: `**Available Updates**: ${packages}\n**API Latency**: ${client.ws.ping} ms`,
                                    inline: true
                                }
                            ],
                            color: 0x24ACF2,
                            footer: {
                                text: "Uptime: " + uptimeStr
                            }
                        }
                        message.channel.send({embed: reqEmbed})
                    }
                })
            }
        })
    }
}
import cp = require('child_process');
import os = require('os');
import Discord = require('discord.js');

export const name = "details"
export const description = ""
export function execute(message: Discord.Message, client: Discord.Client, versionDate: string, version: string) {
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
    cp.exec("git show --oneline -s", (error, stdout) => {
        if (error) {
            let gitShowError = {
                title: "Error",
                color: 0xD72D42,
                description: "```" + error + "```",
                timestamp: new Date()
            }
            message.channel.send({embed: gitShowError});
            return;
        }
        var commitHash = stdout.split(" ")[0];
        if (os.type() === "Linux") {
            cp.exec("apt list --upgradable | wc -l", (error, stdout) => {
                if (error) {
                    let aptError = {
                        title: "Error",
                        color: 0xD72D42,
                        description: "```" + error + "```",
                        timestamp: new Date()
                    }
                    message.channel.send({embed: aptError});
                    return;
                } else {
                    var packages = stdout;
                    var kernel = os.type();
                    cp.exec("node -v", (error, stdout) => {
                        if (error) {
                            let nodeError = {
                                title: "Error",
                                color: 0xD72D42,
                                description: "```" + error + "```",
                                timestamp: new Date()
                            }
                            message.channel.send({embed: nodeError});
                            return;
                        } else {
                            var nodeVersion = stdout.replace("v", "").replace("\n", "");
                            if (kernel === "Windows NT") {
                                var osFamily = "Windows";
                                var osRelease = "10 Pro"
                            }
                            if (kernel === "Linux") {
                                var osFamily = "Ubuntu";
                                var osRelease = "20.04.1 LTS";
                            }
                            let NTEmbed = {
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
                                timestamp: new Date(),
                                footer: {
                                    text: "Uptime: " + uptimeStr
                                }
                            }
                            message.channel.send({embed: NTEmbed})
                        }
                    })
                }
            })
        }
        else if (os.type() === 'Windows_NT') {
            var packages = "None"
            var kernel = "Windows NT";
            cp.exec("node -v", (error, stdout) => {
                if (error) {
                    let nodeError = {
                        title: "Error",
                        color: 0xD72D42,
                        description: "```" + error + "```",
                        timestamp: new Date()
                    }
                    message.channel.send({embed: nodeError});
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
                    var assembledEmbed = {
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
                        timestamp: new Date(),
                        footer: {
                            text: "Uptime: " + uptimeStr
                        }
                    }
                    message.channel.send({embed: assembledEmbed})
                }
            })
        }
    })
}
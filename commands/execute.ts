import cp = require('child_process');
import os = require('os');
import Discord = require('discord.js');

export const name = "execute";
export const description = "ssh but worse";
export function execute(message: Discord.Message, args: string[]) {
    if (os.type() === "Linux") {
        cp.exec(args.join(" "), (error, stdout, stderr) => {
                if (error) {
                    var reqEmbed = {
                        color: 0xD72D42,
                        title: "Error",
                        description: "```" + error + "```",
                        timestamp: new Date(),
                        footer: {
                            text: "Origin: Node/Command Line Error"
                        }
                    };
                    message.channel.send({ embed: reqEmbed });
                    console.error(error);
                }
                else if (stderr) {
                    var reqEmbed = {
                        color: 0xD72D42,
                        title: "Error",
                        description: "```" + stderr + "```",
                        timestamp: new Date(),
                        footer: {
                            text: "Origin: stderr"
                        }
                    };
                    message.channel.send({ embed: reqEmbed });
                    console.error(stderr);
                }
                else if (stdout) {
                    var reqEmbed = {
                        color: 0x77B255,
                        title: "Output",
                        description: "```" + stdout + "```",
                        timestamp: new Date(),
                        footer: {
                            text: "Origin: stdout"
                        }
                    };
                    message.channel.send({ embed: reqEmbed });
                }
            })
    }
    else if (os.type() === "Windows_NT") {
        cp.exec(`powershell.exe -Command ${args.join(" ")}`, (error, stdout, stderr) => {
                if (error) {
                    var reqEmbed = {
                        color: 0xD72D42,
                        title: "Error",
                        description: "```" + error + "```",
                        timestamp: new Date(),
                        footer: {
                            text: "Origin: Node/Command Line Error"
                        }
                    };
                    message.channel.send({ embed: reqEmbed });
                    console.error(error);
                }
                else if (stderr) {
                    var reqEmbed = {
                        color: 0xD72D42,
                        title: "Error",
                        description: "```" + stderr + "```",
                        timestamp: new Date(),
                        footer: {
                            text: "Origin: stderr"
                        }
                    };
                    message.channel.send({ embed: reqEmbed });
                    console.error(stderr);
                }
                else if (stdout) {
                    var reqEmbed = {
                        color: 0x77B255,
                        title: "Output",
                        description: "```" + stdout + "```",
                        timestamp: new Date(),
                        footer: {
                            text: "Origin: stdout"
                        }
                    }
                    message.channel.send({ embed: reqEmbed });
                }
            })
    }
}
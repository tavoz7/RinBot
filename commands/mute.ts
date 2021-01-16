import uuid = require('uuid');
import Discord = require('discord.js');
export const name = "mute";
export const description = "Mute a guild member"
export function execute(message: Discord.Message, args: string[], target: Discord.GuildMember, modLogChannel: string) {
    if (args[1].endsWith('m')) {
        var muteTime = Math.ceil(parseInt(args[1].replace("m", ""))) * 60000;
    }
    else if (args[1].endsWith('h')) {
        var muteTime = Math.ceil(parseInt(args[1].replace("h", ""))) * 3600000;
    }
    if (args[2] === undefined) {
        var reason = "None provided";
    }
    else {
        var reason = args.slice(2).join(" ");
    }
    target.roles.add('769299680357122088');
    console.log(`${target.user.username} has been muted for ${args[1]}`);
    setTimeout(() => {
        console.log("Time's up");
        console.log(target.roles.cache.has('769299680357122088'));
        if (target.roles.cache.has('769299680357122088')) {
            target.roles.remove('769299680357122088');
            console.log(`${target.user.username} has been unmuted`);
        }
    }, 2000);

    // on timeout, check if member still has role. if not, do nothing.
    // also try to implement role validation but i don't think that will be nessecary as the role id is static
}
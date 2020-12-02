const uuid = require('uuid');
module.exports = {
    name: "mute",
    execute(message, args, target, modLogChannel) {
        if (args[1].endsWith('m')) {
            var muteTime = parseInt(args[1].replace("m", "")).toFixed(0) * 60000;
        }
        else if (args[1].endsWith('h')) {
            var muteTime = parseInt(args[1].replace("h", "")).toFixed(0) * 3600000;
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
}
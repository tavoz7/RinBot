module.exports = {
    name: "coinflip",
    description: "Flip a coin",
    execute(message) {
        let choice = Math.floor(Math.random() * 2 - 1 + 2);
        if (choice === 1) {
            message.channel.send("Heads!");
        }
        else if (choice === 2) {
            message.channel.send("Tails!");
        }
    }
}
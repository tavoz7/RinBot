import Discord = require('discord.js');
import Canvas = require('canvas');
export const name="welcomeMessage"
export async function execute(member: Discord.GuildMember) {
    if (member.id === "480754227510247451") return;
    function applyText(canvas: Canvas.Canvas, text: string) {
        const ctx = canvas.getContext('2d');
        // Declare a base size of the font
        let fontSize = 70;
        do {
            // Assign the font to the context and decrement it so it can be measured again
            ctx.font = `${fontSize -= 10}px Whitney Medium`;
            // Compare pixel width of the text to the canvas minus the approximate avatar size
        } while (ctx.measureText(text).width > canvas.width - 300);
        // Return the result to use in the actual canvas
        return ctx.font;
    };
    const channel = member.guild.channels.cache.get("765695810591522836");

    Canvas.registerFont("./res/whitneymedium.otf", {family: "Whitney Medium"});

	const canvas = Canvas.createCanvas(700, 250);
	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage('./res/welcomeBackground.png');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = '#74037b';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	// Slightly smaller text placed above the member's display name
	ctx.font = '28px Whitney Medium';
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`Welcome to ${member.guild.name},`, canvas.width / 2.5, canvas.height / 3.5);

	// Add an exclamation point here and below
	ctx.font = applyText(canvas, `${member.user.username}!`);
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${member.user.username}!`, canvas.width / 2.5, canvas.height / 1.8);

    let welcomeMain = [`Make yourself at home!`, `We're glad you're joining us!`, `Cheers!`];
    ctx.font = "28px Whitney Medium";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText(welcomeMain[Math.floor(Math.random() * welcomeMain.length)], canvas.width / 2.5, canvas.height / 1.3);

	ctx.beginPath();
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

	const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
	ctx.drawImage(avatar, 25, 25, 200, 200);

	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

	(channel as Discord.TextChannel).send(`#${member.guild.memberCount} - Welcome, ${member}!`, attachment);
}
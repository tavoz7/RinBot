import Discord = require('discord.js');
import admin = require('firebase-admin');
import uuid = require('uuid');
export const name = 'interactioninit';
export async function execute(client: Discord.Client, interaction: {member: Discord.GuildMember, guild_id: string, id: string, data: {options: {options: {name: string, value: string}[], name: string}[], name: string, id: string} }, db: FirebaseFirestore.Firestore) {
    function checkIfAllowed() {
        let invokerRoles = invoker.roles.cache.array();
        for (let r of invokerRoles) {
            if (authorizedRoles.includes(r.id)) return true;
        }
        return false;
    }
    async function sendModLog(type: string, retrievedDoc: FirebaseFirestore.DocumentSnapshot) {
        let modLogChannel = await client.channels.fetch(modLogChannelID);
        (modLogChannel as Discord.TextChannel).send({embed:{
            author: {
                name: targetMember.user.tag,
                icon_url: targetMember.user.avatarURL({dynamic: false})
            },
            title: "Image Strike " + type,
            fields: [
                {
                    name: "Member",
                    value: targetMember.user.tag,
                    inline: true
                },
                {
                    name: "Moderator",
                    value: `<@${interaction.member.user.id}>`,
                    inline: true
                },
                {
                    name: "New Strike Amount",
                    value: `${retrievedDoc.data().infractionLevel} of 3`
                }
            ],
            color: 0x24ACF2,
            footer: {
                text: `Member ID: ${targetMember.user.id} • Case ID: ${uuid.v4().slice(0, -28)}`
            },
            timestamp: new Date()
        }});
    }
    function sendInteraction(message: string) {
        // @ts-expect-error     // not implemented in discord.js yet so we have to use this workaround
        client.api.interactions(interaction.id, interaction.token).callback.post({data: {
            type: 3,
            data: {
                content: message,
                flags: 1 << 6
            }
        }})
    }
    // console.log(interaction.data.options); // command name
    // console.log(interaction.data.options[0].options); // user, amnt.
    let authorizedRoles = ['769690913789313054', '685237145052512321', '772162159332425728'];
    let modLogChannelID = interaction.guild_id === "685236709277040802" ? "726176580405035169" : "786592642364342302";
    let disabledImagesRole = interaction.guild_id ==="685236709277040802" ? "808762383882649650" : "769299680357122088";
    let invoker = await (await client.guilds.fetch(interaction.guild_id)).members.fetch(interaction.member.user.id);
    if (interaction.data.options[0].name !== "get" && checkIfAllowed() === false) {
        sendInteraction(":x: You don't have permission to do this!");
        return;
    }
    let targetMember = await (await client.guilds.fetch(interaction.guild_id)).members.fetch(interaction.data.options[0].options[0].value);
    let targetMemberRoles = targetMember.roles.cache.array();
    for (let r of targetMemberRoles) {
        if (authorizedRoles.includes(r.id)) { // block actions from being performed on admins
            sendInteraction(":x: You're not allowed to do that!");
            return;
        }
    }
    let docRef = db.collection(interaction.guild_id).doc('strikes').collection('image').doc(targetMember.user.id);
    let requestedDoc = await docRef.get();
    if (interaction.data.options[0].name === "add") {
        if (requestedDoc.data() === undefined) { // no doc yet
            await docRef.set({
                infractionLevel: 1,
                lastModified: new Date()
            })
            let retrievedDoc = await docRef.get();
            sendInteraction(`:white_check_mark: Successfully gave an image strike to ${targetMember.user.username}. (Strike ${retrievedDoc.data().infractionLevel} of 3)`);
            return;
        }
        else if (requestedDoc.data().infractionLevel < 2) { // doc exists, lt 2
            // 1-2 months
            if (new Date().getTime() - new Date(requestedDoc.data().lastModified.toDate()).getTime() >= 2.628e+9 && new Date().getTime() - new Date(requestedDoc.data().lastModified.toDate()).getTime() < 5.256e+9 && requestedDoc.data().infractionLevel !== 0) {
                sendInteraction(`:white_check_mark: Successfully gave an image strike to ${targetMember.user.username}. (Strike ${requestedDoc.data().infractionLevel} of 3)`);
            }
            // more than 2 months
            else if (new Date().getTime() - new Date(requestedDoc.data().lastModified.toDate()).getTime() >= 5.256e+9 && requestedDoc.data().infractionLevel !== 0) {
                if (requestedDoc.data().infractionLevel === 2) {
                    await docRef.update({
                        infractionLevel: 1,
                        lastModified: new Date(),
                    })
                }
                let retrievedDoc = await docRef.get();
                sendInteraction(`:white_check_mark: Successfully gave an image strike to ${targetMember.user.username}. (Strike ${retrievedDoc.data().infractionLevel} of 3)`);
            }
            else {
                await docRef.update({
                    infractionLevel: admin.firestore.FieldValue.increment(1),
                    lastModified: new Date(),
                })
                let retrievedDoc = await docRef.get();
                sendInteraction(`:white_check_mark: Successfully gave an image strike to ${targetMember.user.username}. (Strike ${retrievedDoc.data().infractionLevel} of 3)`);
                await sendModLog("Given", retrievedDoc);
            }
        }
        else if (requestedDoc.data().infractionLevel === 3) { // perms already nuked
            sendInteraction(`:x: ${targetMember.user.username} already has the maximum amount of strikes possible.`);
        }
        else { // doc exists, equals 2
            await docRef.update({
                infractionLevel: admin.firestore.FieldValue.increment(1),
                lastModified: new Date(),
            })
            targetMember.roles.add(disabledImagesRole);
            sendInteraction(`:white_check_mark: Successfully gave an image strike to ${targetMember.user.username} and revoked image permissions. (Strike 3 of 3)`);
            let retrievedDoc = await db.collection(interaction.guild_id).doc('strikes').collection('image').doc(targetMember.user.id).get()
            await sendModLog("Given", retrievedDoc);
        }
    }
    else if (interaction.data.options[0].name === "remove") {
        if (checkIfAllowed() === false) {
            sendInteraction(":x: You don't have permission to do that!");
            return;
        }
        if (requestedDoc.data() === undefined) {
            sendInteraction(`:x: ${targetMember.user.username} doesn't have any strikes!`);
            return;
        }
        const amount = parseInt(interaction.data.options[0].options[1].value); // not needed but typescript complains
        if (new Date().getTime() - new Date(requestedDoc.data().lastModified.toDate()).getTime() >= 2.628e+9 && new Date().getTime() - new Date(requestedDoc.data().lastModified.toDate()).getTime() < 5.256e+9 && requestedDoc.data().infractionLevel !== 0 && requestedDoc.data().infractionLevel !== 3) {
            await docRef.update({
                infractionLevel: admin.firestore.FieldValue.increment(-1),
                lastModified: new Date()
            })
        }
        else if (new Date().getTime() - new Date(requestedDoc.data().lastModified.toDate()).getTime() >= 5.256e+9 && requestedDoc.data().infractionLevel !== 0 && requestedDoc.data().infractionLevel !== 3) {
            if (requestedDoc.data().infractionLevel === 1) {
                await docRef.update({
                    infractionLevel: admin.firestore.FieldValue.increment(-1),
                    lastModified: new Date()
                })
            }
            else if (requestedDoc.data().infractionLevel === 2) {
                await docRef.update({
                    infractionLevel: admin.firestore.FieldValue.increment(-2),
                    lastModified: new Date()
                })
            }
        }
        if (amount > 3) {
            sendInteraction(`That's too large of a number! You can only take away a maximum of three strikes.`);
        }
        else if (amount <= 0) {
            sendInteraction(`:x: You must specify a value from 1-3.`);
        }
        else if (requestedDoc.data().infractionLevel === 1) {
            if (amount > 1) {
                sendInteraction(`:x: You can't do that - ${targetMember.user.username} only has ${requestedDoc.data().infractionLevel} strike${requestedDoc.data().infractionLevel === 1 ? '' : 's'}.`);
                // 1-2 months
            } else {
                await docRef.update({
                    infractionLevel: requestedDoc.data().infractionLevel - amount,
                    lastModified: new Date()
                })
                let retrievedDoc = await docRef.get();
                sendInteraction(`:white_check_mark: Successfully removed ${amount} strike from ${targetMember.user.username}. (Strike ${retrievedDoc.data().infractionLevel} of 3)`);
                await sendModLog("Removed", retrievedDoc);
            }
        }
        else if (requestedDoc.data().infractionLevel === 2) {
            if (amount > 2) {
                sendInteraction(`:x: You can't do that - ${targetMember.user.username} only has ${requestedDoc.data().infractionLevel} strike${requestedDoc.data().infractionLevel === 1 ? '' : 's'}.`);
                // 1-2 months
            } else {
                await docRef.update({
                    infractionLevel: requestedDoc.data().infractionLevel - amount,
                    lastModified: new Date()
                })
                let retrievedDoc = await docRef.get();
                sendInteraction(`:white_check_mark: Successfully removed ${amount} strike${amount === 1 ? '' : 's'} from ${targetMember.user.username}. (Strike ${retrievedDoc.data().infractionLevel} of 3)`);
                await sendModLog("Removed", retrievedDoc);
            }
        }
        else if (requestedDoc.data().infractionLevel === 3) {
            targetMember.roles.remove(disabledImagesRole);
            await docRef.update({
                infractionLevel: requestedDoc.data().infractionLevel - amount,
                lastModified: new Date()
            })
            sendInteraction(`:white_check_mark: Successfully removed ${amount} strike${amount === 1 ? '' : 's'} from ${targetMember.user.username} and restored image permissions.`);
            let retrievedDoc = await db.collection(interaction.guild_id).doc('strikes').collection('image').doc(targetMember.user.id).get()
            await sendModLog("Removed (L3)", retrievedDoc);
        }
    }
    else if (interaction.data.options[0].name === "reset") {
        if (requestedDoc.data() === undefined || requestedDoc.data().infractionLevel === 0) {
            sendInteraction(`:x: ${targetMember.user.username} doesn't have any strikes!`);
            return;
        }
        else if (requestedDoc.data().infractionLevel === 3) {
            targetMember.roles.remove(disabledImagesRole);
            await docRef.update({
                infractionLevel: 0,
                lastModified: new Date()
            })
            sendInteraction(`:white_check_mark: Successfully removed all strikes from ${targetMember.user.username} and restored image permissions.`);
            let retrievedDoc = await db.collection(interaction.guild_id).doc('strikes').collection('image').doc(targetMember.user.id).get()
            await sendModLog("Reset (L3)", retrievedDoc);
        } else if (requestedDoc.data().infractionLevel < 3) {
            await docRef.update({
                infractionLevel: 0,
                lastModified: new Date()
            })
            sendInteraction(`:white_check_mark: Successfully removed all strikes from ${targetMember.user.username}.`);
        }
    }
    else if (interaction.data.options[0].name === "get") {
        if (checkIfAllowed() === true) {
            if (requestedDoc.data() === undefined) {
                sendInteraction(`:x: ${targetMember.user.username} doesn't have any strikes!`);
                return;
            }
            if (new Date().getTime() - new Date(requestedDoc.data().lastModified.toDate()).getTime() >= 2.628e+9 && new Date().getTime() - new Date(requestedDoc.data().lastModified.toDate()).getTime() < 5.256e+9 && requestedDoc.data().infractionLevel !== 0 && requestedDoc.data().infractionLevel !== 3) {
                await docRef.update({
                    infractionLevel: admin.firestore.FieldValue.increment(-1),
                    lastModified: new Date()
                })
            }
            else if (new Date().getTime() - new Date(requestedDoc.data().lastModified.toDate()).getTime() >= 5.256e+9 && requestedDoc.data().infractionLevel !== 0 && requestedDoc.data().infractionLevel !== 3) {
                if (requestedDoc.data().infractionLevel === 1) {
                    await docRef.update({
                        infractionLevel: admin.firestore.FieldValue.increment(-1),
                        lastModified: new Date()
                    })
                }
                else if (requestedDoc.data().infractionLevel === 2) {
                    await docRef.update({
                        infractionLevel: admin.firestore.FieldValue.increment(-2),
                        lastModified: new Date()
                    })
                }
            }
            requestedDoc = await docRef.get();
            let isRequestingSelf = targetMember.user.username === interaction.member.user.username;
            sendInteraction(`${isRequestingSelf ? "You" : targetMember.user.username} currently ${isRequestingSelf ? "have" : "has"} ${requestedDoc.data().infractionLevel === 3 ? ` ${isRequestingSelf ? 'your' : 'their'} image permissions revoked` : `${requestedDoc.data().infractionLevel} of 3 strikes`}.`)
        }
        else {
            if (targetMember.user.id === interaction.member.user.id) { // 1-2 months
                if (requestedDoc.data() === undefined) {
                    sendInteraction(`:x: You don't have any strikes!`);
                    return;
                }
                if (new Date().getTime() - new Date(requestedDoc.data().lastModified.toDate()).getTime() >= 2.628e+9 && new Date().getTime() - new Date(requestedDoc.data().lastModified.toDate()).getTime() < 5.256e+9 && requestedDoc.data().infractionLevel !== 0 && requestedDoc.data().infractionLevel !== 3) {
                    await docRef.update({
                        infractionLevel: admin.firestore.FieldValue.increment(-1),
                        lastModified: new Date()
                    })
                }
                else if (new Date().getTime() - new Date(requestedDoc.data().lastModified.toDate()).getTime() >= 5.256e+9 && requestedDoc.data().infractionLevel !== 0 && requestedDoc.data().infractionLevel !== 3) { // 2+ months
                    if (requestedDoc.data().infractionLevel === 1) {
                        await docRef.update({
                            infractionLevel: admin.firestore.FieldValue.increment(-1),
                            lastModified: new Date()
                        })
                    }
                    else if (requestedDoc.data().infractionLevel === 2) {
                        await docRef.update({
                            infractionLevel: admin.firestore.FieldValue.increment(-2),
                            lastModified: new Date()
                        })
                    }
                }
                requestedDoc = await docRef.get()
                sendInteraction(`You currently have ${requestedDoc.data().infractionLevel === 3 ? "your image permissions revoked" : `${requestedDoc.data().infractionLevel} of 3 strikes`}.`);
            }
            else {
                sendInteraction(`:x: You don't have permission to do that!`);
            }
        }
    }
}
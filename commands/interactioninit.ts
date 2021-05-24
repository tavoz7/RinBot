import Discord = require('discord.js');
import admin = require('firebase-admin');
import uuid = require('uuid');
import moment = require('moment');
export const name = 'interactioninit';
export async function execute(client: Discord.Client, interaction: {
    users: Discord.User,
    member: {roles: Array<string>, premium_since: Date | null, permissions: string, pending: boolean, nick: string | null, mute: boolean, joined_at: Date, is_pending: boolean, deaf: boolean, user: {id: string, username: string, avatar: string, discriminator: string, public_flags: number}}, guild_id: string, id: string, data: {options: {options: {name: string, value: string}[], name: string}[], name: string, id: string} }, db: FirebaseFirestore.Firestore) {
    function checkIfNotStaffMember() {
        for (let i of authorizedRoles) {
            if (targetMemberRoles.array().map(r => r.id).includes(i)) return false;
        }
        return true;
    }
    function checkIfAllowed() {
        let invokerRoles = interaction.member.roles;
        for (let r of invokerRoles) {
            if (authorizedRoles.includes(r)) return true;
        }
        return false;
    }
    function sendInteraction(message: string) {
        // @ts-expect-error     // not implemented in discord.js yet so we have to use this workaround
        client.api.interactions(interaction.id, interaction.token).callback.post({data: {
            type: 4,
            data: {
                content: message,
                flags: 1 << 6
            }
        }})
    }
    function sendGetCommandInteraction(message: string, retrievedDoc: FirebaseFirestore.DocumentSnapshot, isRequestingSelf: boolean) {
        // @ts-expect-error
        client.api.interactions(interaction.id, interaction.token).callback.post({data: {
            type: 4,
            data: {
                content: message,
                embeds: [
                    {
                        author: {
                            name: targetMember.user.tag,
                            icon_url: targetMember.user.displayAvatarURL({dynamic: false})
                        },
                        color: 0x24ACF2,
                        title: isRequestingSelf ? `Your Strikes` : `Strikes for ${targetMember.user.tag}`,
                        fields: [ // note to self: please fix this, it only works because the check for 'undefined' is in the first position
                            {
                                name: "Strikes",
                                value: retrievedDoc.data() === undefined ? '0' : retrievedDoc.data().infractionLevel,
                                inline: true
                            },
                            {
                                name: "Images Disabled",
                                value: retrievedDoc.data() !== undefined && retrievedDoc.data().infractionLevel === 3 ? "Yes" : "No",
                                inline: true
                            },
                            {
                                name: "Next Strike Removal",
                                value: retrievedDoc.data() === undefined || retrievedDoc.data().infractionLevel === 0 || retrievedDoc.data().infractionLevel === 3 ? "N/A" : (moment(new Date((requestedDoc.data().lastModified.toDate() as Date).getTime() + 2.628e+9)).format("Z").includes("05:00") ? moment(new Date((requestedDoc.data().lastModified.toDate() as Date).getTime() + 2.628e+9)).format("D MMM YYYY [at] h:mm A") + " CDT" : moment(new Date((requestedDoc.data().lastModified.toDate() as Date).getTime() + 2.628e+9)).format("D MMM YYYY [at] h:mm A") + " CST"),
                                inline: true
                            }
                        ]
                    }
                ],
                flags: 1 << 6
            }
        }})
    }
    async function sendModLog(type: string, retrievedDoc: FirebaseFirestore.DocumentSnapshot) {
        let modLogChannel = await client.channels.fetch(modLogChannelID);
        (modLogChannel as Discord.TextChannel).send({embed:{
            author: {
                name: targetMember.user.tag,
                icon_url: targetMember.user.displayAvatarURL({dynamic: false})
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
                    value: `${retrievedDoc.data().infractionLevel} of 3`,
                    inline: true
                }
            ],
            color: 0x24ACF2,
            footer: {
                text: `Member ID: ${targetMember.user.id} • Case ID: ${uuid.v4().slice(0, -28)}`
            },
            timestamp: new Date()
        }});
    }
    /*
        OBJECT STRUCTURE
        interaction: {
            data: {
                users: Discord.User (somewhat)
                members: Discord.GuildMember (somewhat)
                options: [
                    options: [
                        0: value: Requested Member ID,
                        1: value: Requested Number
                    ],
                    name: add, remove, reset, get
                ]
            }
        }

    */
    const authorizedRoles = ['769690913789313054', '685237145052512321', '772162159332425728', '766858374377504818']; // staff roles
    const modLogChannelID = interaction.guild_id === "685236709277040802" ? "726176580405035169" : "781602141584097351"; // mod log channel, either Kubo server or BTL
    const disabledImagesRole = interaction.guild_id === "685236709277040802" ? "808762383882649650" : "769299680357122088"; // same as above but role
    const invoker = await (await client.guilds.fetch(interaction.guild_id)).members.fetch(interaction.member.user.id); // member who invoked slash command
    if (interaction.data.options[0].name !== "get" && checkIfAllowed() === false) {
        sendInteraction(":x: You don't have permission to do this!");
        return;
    }
    const targetMember = await (await client.guilds.fetch(interaction.guild_id)).members.fetch(interaction.data.options[0].options[0].value);
    const targetMemberRoles = targetMember.roles.cache;
    const docRef = db.collection(interaction.guild_id).doc("strikes").collection("image").doc(interaction.data.options[0].options[0].value);
    const command = interaction.data.options[0].name;
    let requestedDoc = await docRef.get();
    if (!checkIfNotStaffMember() && command !== "get") {
        sendInteraction(`:x: Staff can't have strikes!`);
        return;
    }
    if (requestedDoc.data() !== undefined && requestedDoc.data().infractionLevel !== 3 && requestedDoc.data().infractionLevel !== 0) {
        if (new Date().getTime() - (requestedDoc.data().lastModified.toDate() as Date).getTime() >= 2.628e+9 && new Date().getTime() - (requestedDoc.data().lastModified.toDate() as Date).getTime() < 5.256e+9) {
            await docRef.update({
                infractionLevel: requestedDoc.data().infractionLevel === 1 ? 0 : 1,
                lastModified: new Date()
            });
            requestedDoc = await docRef.get();
        }
        else if (new Date().getTime() - (requestedDoc.data().lastModified.toDate() as Date).getTime() >= 5.256e+9) {
            await docRef.update({
                infractionLevel: 0,
                lastModified: new Date()
            });
            requestedDoc = await docRef.get();
        }
    }
    switch (command) {
        case "add": {
            if (requestedDoc.data() === undefined) { // db entry for user does not exist; create it
                await docRef.set({
                    infractionLevel: 1,
                    lastModified: new Date()
                });
                requestedDoc = await docRef.get();
                sendInteraction(`:white_check_mark: Successfully gave an image strike to ${targetMember.user.username}. (Strike ${requestedDoc.data().infractionLevel} of 3)`);
                await sendModLog("Given", requestedDoc);
            }
            else if (requestedDoc.data().infractionLevel === 3) { // already at L3
                sendInteraction(`:x: ${targetMember.user.username} already has 3 strikes.`);
            } else { // not at L3
                await docRef.set({
                    infractionLevel: admin.firestore.FieldValue.increment(1),
                    lastModified: new Date()
                });
                // i am barely confident that this works, but meh
                requestedDoc = await docRef.get();
                if (requestedDoc.data().infractionLevel === 3) {
                    targetMember.roles.add(disabledImagesRole);
                    sendInteraction(`:white_check_mark: Successfully gave an image strike to ${targetMember.user.username} and revoked image permissions. (Strike 3 of 3)`);
                } else sendInteraction(`:white_check_mark: Successfully gave an image strike to ${targetMember.user.username}. (Strike ${requestedDoc.data().infractionLevel} of 3)`);
                await sendModLog("Given", requestedDoc);
            }
            break;
        }
        case "remove": {
            const amountToRemove = parseInt(interaction.data.options[0].options[1].value);
            if (requestedDoc.data() === undefined || requestedDoc.data().infractionLevel === 0) {
                sendInteraction(`:x: ${targetMember.user.username} doesn't have any strikes!`);
                return;
            }
            if (amountToRemove > 3) {
                sendInteraction(`:x: That's too large of a number! You can only take away a maximum of three strikes.`);
                return;
            }
            if (amountToRemove <= 0) {
                sendInteraction(`:x: You must specify a value from 1-3.`);
                return;
            }
            if (amountToRemove > requestedDoc.data().infractionLevel) {
                sendInteraction(`:x: That's too many strikes; ${targetMember.user.username} only has ${requestedDoc.data().infractionLevel} strikes.`);
                return;
            }
            const oldInfractionLevel = requestedDoc.data().infractionLevel
            await docRef.update({
                infractionLevel: requestedDoc.data().infractionLevel - amountToRemove,
                lastModified: new Date()
            });
            requestedDoc = await docRef.get();
            if (oldInfractionLevel === 3) {
                targetMember.roles.remove(disabledImagesRole);
                sendInteraction(`:white_check_mark: Successfully removed ${amountToRemove} strike${amountToRemove === 1 ? '' : 's'} from ${targetMember.user.username} and restored image permissions.`);
                await sendModLog("Removed (L3)", requestedDoc)
            } else {
                sendInteraction(`:white_check_mark: Successfully removed ${amountToRemove} strike${amountToRemove === 1 ? '' : 's'} from ${targetMember.user.username}. (Strike ${requestedDoc.data().infractionLevel} of 3)`);
                await sendModLog("Removed", requestedDoc);
            }
            break;
        }
        case 'reset': {
            if (requestedDoc.data() === undefined || requestedDoc.data().infractionLevel === 0) {
                sendInteraction(`:x: ${targetMember.user.username} doesn't have any strikes!`);
                return;
            }
            const oldInfractionLevel = requestedDoc.data().infractionLevel;
            if (oldInfractionLevel === 3) {
                targetMember.roles.remove(disabledImagesRole);
                await docRef.update({
                    infractionLevel: 0,
                    lastModified: new Date()
                });
                sendInteraction(`:white_check_mark: Successfully removed all strikes from ${targetMember.user.username} and restored image permissions.`);
                sendModLog("Reset (L3)", await docRef.get());
            } else {
                await docRef.update({
                    infractionLevel: 0,
                    lastModified: new Date()
                });
                sendInteraction(`:white_check_mark: Successfully removed all strikes from ${targetMember.user.username}.`);
                sendModLog("Reset", await docRef.get());
            }
            break;
        }
        case 'get': {
            const isRequestingSelf = targetMember.user.id === interaction.member.user.id;
            const infractionLevel = requestedDoc.data() !== undefined ? requestedDoc.data().infractionLevel : 0;
            if (isRequestingSelf === true) {
               sendGetCommandInteraction(`You currently have ${infractionLevel} of 3 strikes${infractionLevel === 3 ? ' and your image permissions revoked' : ''}.`, requestedDoc, isRequestingSelf);
            } else if (!isRequestingSelf && checkIfAllowed()) {
                sendGetCommandInteraction(`${targetMember.user.username} currently has ${infractionLevel} of 3 strikes${infractionLevel === 3 ? ' and their image permissions revoked' : ''}.`, requestedDoc, isRequestingSelf);
            } else {
                sendInteraction(`:x: You're not allowedd to do this!`);
            }
            break;
        }
    }
}

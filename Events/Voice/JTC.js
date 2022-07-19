const { VoiceState } = require("discord.js");
const { Client } = require("discord.js")

module.exports = {
    name: "voiceStateUpdate",

     /**
      * 
      * @param {VoiceState} oldState 
      * @param {VoiceState} newState 
      */
    async execute(oldState, newState, client) {
        const { member, guild } = newState;
        const oldChannel = oldState.channel;
        const newChannel = newState.channel;
        const joinToCreate = "CHANNEL ID"

        if(oldChannel !== newChannel && newChannel && newChannel.id === joinToCreate) {
            const voiceChannel = await guild.channels.create(member.user.tag, {
                type: "GUILD_VOICE",
                parent: newChannel.parent,
                permissionOverwrites: [
                    {id: member.id, allow: ["CONNECT"]},
                    {id: guild.id, deny: ["CONNECT"]}
                ]
            });
            client.voiceGenerator.set(member.id, voiceChannel.id);
            await newChannel.permissionOverwrites.edit(member, {CONNECT: false});
            setTimeout(() => newChannel.permissionOverwrites.delete(member), 30 * 1000);

            return setTimeout(() => member.voice.setChannel(voiceChannel), 500)         
        } 
    }
}
const { commandInteraction, Client} = require("discord.js")


module.exports = {
    name: "emitt",
    description: "Event Emitter",
    permission: "ADMINISTRATOR",
    options: [
        {
            name: "member",
            description: "Guild Member Events",
            type: "STRING",
            required: true,
            choices: [
                {
                    name: "guildMemberAdd",
                    value: "guildMemberAdd"
                },
                {
                    name: "guildMemberRemove",
                    value: "guildMemberRemove"
                }
            ]
        }
    ],

    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    execute(interaction,client) {
const choices = interaction.options.getString("member");

switch(choices) {
    case "guildMemberAdd" : {
        client.emit("guildMemberAdd", interaction.member);
        interaction.reply({content: "emitted the Event", ephermal: true})
    }
    break;
    case "guildMemberRemove" : {
        client.emit("guildMemberRemove", interaction.member);
        interaction.reply({content: "emitted the Event", ephermal: true})
    }
}
    }
}
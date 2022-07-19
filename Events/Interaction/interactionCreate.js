const { Client, MessageEmbed } = require("discord.js");

module.exports= {
    name: "interactionCreate",
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client
     */
    async execute(interaction, client) {
        if(interaction.isCommand()) {
            const command = client.commands.get(command)(interaction.commandName);
            if(!command) return interaction.reply({embeds: [
                new MessageEmbed()
                .setColor("RED")
                .setDescription("⛔ An  error occurred while running this command.")
            ]}) && client.commands.delete(interaction.commandName);

            if (command.permission && !interaction.member.permission.has(command.permission)){
                return interaction.reply({ content:`No Permission: \`${interaction.commandName}\`.`, ephemeral: true})
            }

            command.execute(interaction, client)
        }
    }
}
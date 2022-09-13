const {CommandInteraction, Client, EmbedBuilder} = require("discord.js")
const {connection } = require("mongoose");
require("../../Events/Client/ready")

module.exports = {
    name: "status",
    permission: "ADMINISTRATOR",
    description: "Displays the status of the bot",
    
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    
    
    async execute(interaction, client) {
        
        const Response = new EmbedBuilder()
        .setColor("AQUA")
        .setDescription(`**CLIENT**:\`🟢 ONLINE \` - \`${client.ws.ping}MS\``)
        interaction.reply({embeds: [Response]})
    }
}

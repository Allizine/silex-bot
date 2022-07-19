const {CommandInteraction, Client, MessageEmbed} = require("discord.js")
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
        
        const Response = new MessageEmbed()
        .setColor("AQUA")
        .setDescription(`**CLIENT**:\`🟢 ONLINE \` - \`${client.ws.ping}MS\`\n **UPTIME**: <t:${parseInt(client.readyTimestamp)}:R>`)
        interaction.reply({embeds: [Response]})
    }
}

function switchVal(val) {
    var status = " ";
    switch(val) {
        case 0 : status= `😡 DISCONNECTED`
        break;
        case 1 : status = `✅ CONNECTING`
        break;
        case 2 : status = `🟠 CONNECTING`
        break;
        case 3 : status = `😔 DISCONNECTING`
        break;
    }
    return status;
}
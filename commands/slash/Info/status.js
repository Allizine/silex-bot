const { EmbedBuilder } = require('discord.js');
module.exports = {
  name: "status",
  description: "Displays the Status of the Bot",
  permissions: {
    member: ['ADMINISTRATOR'],
  },
  run: (client, interaction) => {
    const Response = new EmbedBuilder()
      .setColor('#00ffe3')
      .setDescription(`**CLIENT**:\`🟢 ONLINE \` - \`${client.ws.ping}MS\``)
    interaction.reply({ embeds: [Response] });
  },
};

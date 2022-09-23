const { EmbedBuilder } = require('discord.js');
module.exports = {
  name: "ping",
  description: "Get a ping of the Bot",

  run: async (client, interaction) => {
    const response = new EmbedBuilder()
      .setColor('#00ffff')
      .setTitle('Pong!')
    const msg = await interaction.reply({ embeds: [response], fetchReply: true });
    response.setDescription(`Bot Latency: \`${msg.createdTimestamp - interaction.createdTimestamp} ms\`\nWebsocket Latency: \`${client.ws.ping} ms\``)
    await interaction.editReply({ embeds: [response] });
  },
};

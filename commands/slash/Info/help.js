const { ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
module.exports = {
  name: "help",
  description: "Displays help message",
  /*options: [
    {
      name: "commands",
      description: "Displays Info about Commands",
      type: ApplicationCommandOptionType.Subcommand,
    },
    {
      name: "contact",
      description: "Displays Contact Info",
      type: ApplicationCommandOptionType.Subcommand,
    },
    {
      name: "faq",
      description: "Displays the FAQ",
      type: ApplicationCommandOptionType.Subcommand,
    },
  ],*/

  run: async (client, interaction) => {
    const helprow = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId("command")
          .setLabel("Commands")
          .setStyle(ButtonStyle.Primary),
      )
    const msg = new EmbedBuilder()
      .setColor('#00ffff')
      .setTitle("Help Menu")
    await interaction.reply({ ephemeral: true, embeds: [msg], components: [helprow] });
  },
};

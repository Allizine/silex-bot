const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
module.exports = {
  name: "kick",
  description: "Kicks a member.",
  permissions: {
    member: ['ADMINISTRATOR'],
  },
  options: [
    {
      name: "Member",
      description: "Select a member.",
      type: ApplicationCommandOptionType.User,
      required: true,
    },
  ],

  run: (client, interaction) => {
    interaction.reply({content: "Test", ephemeral: true});
  },
};

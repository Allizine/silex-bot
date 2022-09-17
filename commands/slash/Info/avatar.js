const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
module.exports = {
  name: "avatar",
  description: "Displays someone\'s Avatar",
  permissions: {
    member: ['ADMINISTRATOR'],
  },
  options: [
    {
      name: 'member',
      description: 'Select a Member',
      type: ApplicationCommandOptionType.User,
      required: true,
    },
  ],

  run: async (client, interaction) => {
    member=interaction.options.getUser('member');
    const Response = new EmbedBuilder()
      .setTitle(member.username+"\'s Avatar")
      .setColor('#00ffe3')
      .setImage(member.avatarURL())
    interaction.reply({ embeds: [Response] });
  },
};

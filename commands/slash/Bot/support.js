const { EmbedBuilder } = require("discord.js");
module.exports = {
  name: "support-us",
  description: "Displays Information on how you can support us.",
  permissions: {
    member: ["SEND_MESSAGES"],
  },

  run: (client, interaction) => {
    const response = new EmbedBuilder()
      .setColor('#00ffff')
      .setTitle("How to support Silex")
      .setDescription("Hey, thanks for considering to support our Server. We aim to create the best possible experience for all of you.\n\nIf you decide to support us by donating, it goes a long way to helping us improve things for all of you!\n\nEvery bit of money we gain, we 100% put back into the Server, be that for the future integration of dedicated Gaming Servers, or paying for awesome features that make the Community more engaging.\n\nIf this has peaked your interest and you have decided that you would like to support us, you can do so [here](https://patreon.com/silex_community)")
      .setTimestamp()
    interaction.reply({embeds: [response], ephemeral: true});
  },
};

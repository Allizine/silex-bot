const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
module.exports = {
  name: "suggest",
  description: "Submits a suggestion.",
  permissions: {
    member: ["SEND_MESSAGES"],
  },
  options: [
    {
      name: "suggestion",
      description: "Describe your suggestion.",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "anonymous",
      description: "Set if you want the suggestion to be anonymous.",
      type: ApplicationCommandOptionType.Boolean,
      required: false,
    },
  ],

  run: async (client, interaction) => {
    const sug = interaction.options.getString("suggestion");
    const guild = client.guilds.cache.get('996664256512655360');
    const channel = guild.channels.cache.get('996670456813854750');
    const anonym=interaction.options.getBoolean("anonymous");
    const msg = new EmbedBuilder()
      .setColor('#00ffff')
      .setTitle("Suggestion")
      .setDescription(sug)
      .setTimestamp()
    if (anonym==undefined || anonym==false) {
      msg.setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()});
    } else {
      msg.setAuthor({name: "Anonymous"});
    }
    const message = await channel.send({embeds: [msg]});
    message.react('⬆️');
    message.react('⬇️');
    await interaction.reply({content: "Your Suggestion has been submitted successfully!", ephemeral: true});
  },
};

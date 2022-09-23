const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');
module.exports = {
  name: "mute",
  description: "Mutes a member",
  options: [
    {
      name: "member",
      description: "Select a member",
      type: ApplicationCommandOptionType.User,
      required: true
    },
    {
      name: "reason",
      description: "Define a reason",
      type: ApplicationCommandOptionType.String,
      required: false,
    },
  ],

  run: async (client, interaction) => {
    const user = interaction.options.getUser('member');
    var reason = interaction.options.getString('reason');
    const guild = client.guilds.cache.get('996664256512655360');
    const channel = guild.channels.cache.get('996668966279843840');
    const mod = interaction.user.id;
    var time=999999999999999999999999999999999999999999999
    if (reason == undefined || reason == "" || reason == " ") {
      reason = "No Reason specified.";
    }
    const mutemsg = new EmbedBuilder()
      .setColor('#ff0000')
      .setTitle("You have been muted in Silex!")
      .addFields(
        { name: "Duration", value: "\`Permanent\`" },
        { name: "Reason", value: reason }
      )
      .setTimestamp()
    const response = new EmbedBuilder()
      .setColor('#ff0000')
      .setAuthor({ name: "Member muted", iconURL: user.avatarURL() })
      .addFields(
        { name: "User", value: `<@${user.id}>` },
        { name: "Moderator", value: `<@${mod}>` },
        { name: "Duration", value: "\`Permanent\`" },
        { name: "Reason", value: reason }
      )
      .setTimestamp()
    await user.send({ embeds: [mutemsg] });
    await interaction.reply({ embeds: [response], ephemeral: true });
    await channel.send({ embeds: [response] });
    await user.timeout(time, reason);
  },
};

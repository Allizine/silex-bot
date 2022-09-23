const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');
module.exports = {
  name: "ban",
  description: "Bans a member",
  options: [
    {
      name: "member",
      description: "Select a member.",
      type: ApplicationCommandOptionType.User,
      required: true,
    },
    {
      name: "reason",
      description: "Define a reason.",
      type: ApplicationCommandOptionType.String,
      required: false,
    },
  ],

  run: async (client, interaction) => {
    const guild = client.guilds.cache.get('996664256512655360');
    const channel = guild.channels.cache.get('996668966279843840');
    const user = interaction.options.getUser('member');
    const mod = interaction.user.id;
    var reason = interaction.options.getString('reason');
    if (reason==undefined || reason=="" || reason==" ") {
      reason="The Ban Hammer has spoken.";
    }
    const banmsg = new EmbedBuilder()
      .setColor('#ff0000')
      .setTitle('You have been banned from Silex!')
      .setDescription(`Reason: ${reason}`)
      .addFields({name: "Ban Appeal", value: "[Click Here](https://dyno.gg/form/60846298)"})
      .setTimestamp()
    const response = new EmbedBuilder()
      .setColor('#ff0000')
      .setAuthor({name: "Member banned", iconURL: user.avatarURL()})
      .addFields(
        {name: "User", value: `<@${user.id}>`},
        {name: "Moderator", value: `<@${mod}>`},
        {name: "Reason", value: reason}
      )
      .setTimestamp()
    await user.send({embeds: [banmsg]});
    await interaction.reply({embeds: [response], ephemeral: true});
    await channel.send({embeds: [response]});
    await guild.members.ban(user, reason);
  },
};

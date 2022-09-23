const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');
module.exports = {
  name: "kick",
  description: "Kick a member",
  options: [
    {
      name: "member",
      description: "Submit a Member",
      type: ApplicationCommandOptionType.User,
      required: true,
    },
    {
      name: "reason",
      description: "Submit a Reason",
      type: ApplicationCommandOptionType.String,
      required: false,
    },
  ],

  run: async (client, interaction) => {
    const member = interaction.options.getUser("member");
    var reason = interaction.options.getString("reason");
    const mod = interaction.user.id;
    if (reason==undefined || reason=="" || reason==" ") {
      reason="No reason specified.";
    }
    const kickmsg = new EmbedBuilder()
      .setColor('#ff0000')
      .setTitle("You have been kicked from Silex!")
      .setDescription('Reason: '+reason)
      .setTimestamp()
    await member.send({embeds: [kickmsg]});
    const response = new EmbedBuilder()
      .setColor('#ff0000')
      .setAuthor({name: "Member kicked", iconURL: member.avatarURL()})
      .addFields(
        {name: "User", value: `<@${member.id}>`},
        {name: "Moderator", value: `<@${mod}>`},
        {name: "Reason", value: reason}
      )
      .setTimestamp()
    interaction.reply({embeds: [response], ephemeral: true});
    const guild = client.guilds.cache.get("996664256512655360");
    const user = guild.members.cache.get(member.id);
    const channel = guild.channels.cache.get('996668966279843840');
    await channel.send({embeds: [response]})
    await guild.members.kick(user, reason);
  },
};

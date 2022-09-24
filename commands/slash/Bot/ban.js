const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const ms = require("ms");
module.exports = {
  name: 'ban',
  description: 'Bans a member',
  permissions: {
    member: ['ADMINISTRATOR'],
  },
  options: [
    {
      name: 'member',
      description: 'Select a member.',
      type: ApplicationCommandOptionType.User,
      required: true,
    },
    {
      name: 'reason',
      description: 'Define a reason.',
      type: ApplicationCommandOptionType.String,
      required: false,
    },
  ],

  run: async (client, interaction) => {
    const guild = client.guilds.cache.get('996664256512655360');
    const channel = guild.channels.cache.get('996668966279843840');
    const user = interaction.options.getUser('member');
    const mod = interaction.user;
    var reason = interaction.options.getString('reason');
    const member = guild.users.cache.get(user.id);
    const msg = new EmbedBuilder()
      .setColor('#ff0000')
      .setAuthor({name: mod.username, iconURL: mod.avatarURL()})
      .setTitle("You have been banned from Silex!")
      .addFields(
        {name: "Duration", value: "Permanent", inline: true},
        {name: "Reason", value: reason, inline: true},
        {name: "Ban Appeal", value: "[Click Here](https://dyno.gg/form/60846298)"}
      )
      .setTimestamp()
    const log = new EmbedBuilder()
      .setColor('#ff0000')
      .setAuthor({name: "Member banned", iconURL: user.avatarURL()})
      .addFields(
        {name: "User", value: `<@${user.id}>`},
        {name: "Moderator", value: `<@${mod.id}>`},
        {name: "Duration", value: "Permanent", inline: true},
        {name: "Reason", value: reason, inline: true}
      )
      .setFooter({text: `ID: ${user.id}`})
      .setTimestamp()
    await user.send({embeds: [msg]});
    await interaction.reply({embeds: [log], ephemeral: true});
    await channel.send({embeds: [log]});
    await member.ban({reason: reason});
  },
};

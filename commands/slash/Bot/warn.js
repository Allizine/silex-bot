const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
module.exports = {
  name: "warn",
  description: "Warns a member",
  permissions: {
    member: ["MANAGE_MESSAGES"],
  },
  options: [
    {
      name: "member",
      description: "Submit a member.",
      type: ApplicationCommandOptionType.User,
      required: true,
    },
    {
      name: "reason",
      description: "Submit a reason",
      type: ApplicationCommandOptionType.String,
      required: false,
    },
  ],

  run: async (client, interaction) => {
    const member=interaction.options.getUser("member");
    var reason=interaction.options.getString("reason");
    const mod = interaction.user;
    if (reason==undefined || reason=="" || reason==" ") {
      reason="No Reason specified.";
    }
    const warn = new EmbedBuilder()
      .setColor('#ff0000')
      .setAuthor({name: mod.username, iconURL: mod.avatarURL()})
      .setTitle("You have been warned!")
      .addFields({name: "Reason", value: reason})
    const log = new EmbedBuilder()
      .setColor('#ff0000')
      .setAuthor({name: "Member warned", iconURL: member.avatarURL()})
      .addFields(
        {name: "User", value: `<@${member.id}>`},
        {name: "Moderator", value: `<@${mod.id}>`},
        {name: "Reason", value: reason}
      )
      .setFooter({text: `ID: ${member.id}`})
      .setTimestamp()
    const guild = client.guilds.cache.get("996664256512655360");
    const channel = guild.channels.cache.get("996668966279843840");
    await member.send({embeds: [warn]});
    await interaction.reply({embeds: [log], ephemeral: true});
    await channel.send({embeds: [log]});
  },
};

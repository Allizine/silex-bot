const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
module.exports = {
  name: "announce",
  description: "Send an Announcement in a Channel",
  permissions: {
    member: ['ADMINISTRATOR'],
  },
  options: [
    {
      name: "message",
      description: "Submit a Message",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "channel",
      description: "Select a Channel",
      type: ApplicationCommandOptionType.Channel,
      required: true,
    },
    {
      name: "mention",
      description: "Submit a Role to mention",
      type: ApplicationCommandOptionType.Role,
      required: true,
    },
    {
      name: "color",
      descripttion: "Select a Color",
      type: ApplicationCommandOptionType.String,
      choices: [{name: "Black", value: "#000000"},{name: "Cyan", value: "#00ffff"},],
      required: true,
    },
  ],

  run: async (client, interaction) => {
    const option = interaction.options;
    const msg = option.getString("message");
    const channel = option.getChannel("channel");
    const mention = option.getRole("mention");
    const color = option.getString("color");
    const Announcement = new EmbedBuilder()
      .setColor(color)
      .setAuthor({name: interaction.user.tag, iconURL: interaction.user.avatarURL()})
      .setTitle("Community Announcement")
      .setDescription(msg)
      .setTimestamp()
    await channel.send({content: `${mention}`, embeds: [Announcement]});
    interaction.reply({content: "Successfully sent the Announcement", ephemeral: true});
  },
};

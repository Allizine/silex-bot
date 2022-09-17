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
  ],

  run: async (client, interaction) => {
    const option = interaction.options;
    const msg = option.getString("message");
    const channel = option.getChannel("channel");
    const mention = option.getRole("mention");
    const Announcement = new EmbedBuilder()
      .setColor("#00ffff")
      .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()})
      .setTitle("Community Announcement")
      .setDescription(msg.replaceAll("<br>","\n"))
      .setImage("https://www.dropbox.com/s/tcoqwpkxgg3e1gg/silexcommunityannounce.png?dl=1")
      .setTimestamp()
      .setFooter({text: "Created by Silvae & Julexar", iconURL: "https://www.dropbox.com/s/e2e5a6sw3d87hqd/SILEX.png?dl=1"})
    await channel.send({content: `${mention}`, embeds: [Announcement]});
    interaction.reply({content: "Successfully sent the Announcement", ephemeral: true});
  },
};

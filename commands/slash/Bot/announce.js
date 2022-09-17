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
      description: "Select a Color",
      type: ApplicationCommandOptionType.String,
      choices: [
        {
          name: "Black",
          value: "#000000",
        },
        {
          name: "White",
          value: "#ffffff",
        },
        {
          name: "Light Grey",
          value: "#c5c5c5",
        },
        {
          name: "Grey",
          value: "#acacac",
        },
        {
          name: "Dark Grey",
          value: "#575757",
        },
        {
          name: "Red",
          value: "#ff0000",
        },
        {
          name: "Orange",
          value: "#ff7600",
        },
        {
          name: "Yellow",
          value: "ffe500",
        },
        {
          name: "Lime",
          value: "#64ff00",
        },
        {
          name: "Green",
          value: "#00c404",
        },
        {
          name: "Dark Green",
          value: "#006f02",
        },
        {
          name: "Cyan",
          value: "#00ffff",
        },
        {
          name: "Blue",
          value: "#0090ff",
        },
        {
          name: "Dark Blue",
          value: "#0027ff",
        },
        {
          name: "Purple",
          value: "#701cff",
        },
        {
          name: "Dark Purple",
          value: "#350099",
        },
        {
          name: "Pink",
          value: "#e09fff",
        },
        {
          name: "Magenta",
          value: "#ad00ff",
        },
      ],
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

const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
module.exports = {
  name: "whisper",
  description: "Sends a DM to a member",
  aliases: ['w','wh','dm','pm'],
  permissions: {
    member: ['ADMINISTRATOR'],
  },
  options: [
    {
      name: "member",
      description: "Select a Member",
      type: ApplicationCommandOptionType.User,
      required: true,
    },
    {
      name: "message",
      description: "Define the Message",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],

  run: async (client, interaction) => {
    const member = interaction.options.getUser('member');
    const message = interaction.options.getString('message');
    const msg = new EmbedBuilder()
      .setColor('#00ffff')
      .setTitle("Staff Message")
      .setAuthor({name: interaction.member.username, iconURL: interaction.member.avatarURL()})
      .setDescription(message)
    await member.send({embeds: [msg]});
  },
};

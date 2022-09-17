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
    const name = interaction.user.tag;
    const avatar = interaction.user.avatarURL();
    const msg = new EmbedBuilder()
      .setColor('#00ffff')
      .setTitle("Staff Message")
      .setAuthor({name: name, iconURL: avatar})
      .setDescription(message)
    await member.send({embeds: [msg]});
    interaction.reply({content: "Successfully sent a DM to "+member.tag, ephemeral: true});
  },
};

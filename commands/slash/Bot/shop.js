const { ApplicationCommandOptionType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, PermissionFlagBits } = require('discord.js');
const fs = require('fs');
module.exports = {
  name: "shop",
  description: "Displays the Shop and various Options.",
  permissions: {
    member: ["SEND_MESSAGES"],
  },
  options: [
    {
      name: "buy",
      description: "Buy an Item from the Shop.",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "item",
          description: "Provide the name of an Item.",
          type: ApplicationCommandOptionType.String,
          required: true,
        },
        {
          name: "amount",
          description: "Provide a Number.",
          type: ApplicationCommandOptionType.Integer,
          required: false,
        },
      ],
    },
    {
      name: "list",
      description: "Shows a list of all Items",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "item name",
          description: "Provide the name of an Item.",
          type: ApplicationCommandOptionType.String,
          required: false,
        },
      ],
    },
  ],

  run: async (client, interaction) => {
    const member = interaction.user;
    switch (interaction.options.getSubcommand()) {
      case 'buy':

        break;
      case 'list':
        var inventory = [];
        var inv = fs.readFileSync("./shop.json").data;
        for (let data in inv) {
          console.log(data);
        }
        break;
    }
  },
};

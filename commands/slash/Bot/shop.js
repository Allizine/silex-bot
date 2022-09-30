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
      ],
    },
    {
      name: "list",
      description: "Shows a list of all Items",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "name",
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
        var shop = [];
        var info = JSON.parse(fs.readFileSync("./database/shop.json"));
        shop.push(info);
        const row = new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
              .setCustomId('shopprev')
              .setStyle(ButtonStyle.Primary)
              .setEmoji('⏪')
              .setDisabled(true),
            new ButtonBuilder()
              .setCustomId('shopnext')
              .setStyle(ButtonStyle.Primary)
              .setEmoji('⏩')
          );
        const list1 = new EmbedBuilder()
          .setColor('#00ffff')
          .setAuthor({ name: "Page 1/2" })
          .setTitle(`${shop[0].name}`)
        const list2 = new EmbedBuilder()
          .setColor('#00ffff')
          .setAuthor({ name: "Page 2/2" })
          .setTitle(`${shop[0].name}`)
        for (let i = 0; i < shop[0].inventory.length; i++) {
          let emoji = shop[0].inventory[i].emoji;
          let name = shop[0].inventory[i].name;
          let price = shop[0].inventory[i].price;
          if (i < 4) {
            list1.addFields(
              { name: "Name", value: `${emoji} ${name}`, inline: true },
              { name: "Price", value: `${price}`, inline: true },
              { name: "\u200B", value: "\u200B" }
            );
          } else if (i >= 4) {
            list2.addFields(
              { name: "Name", value: `${emoji} ${name}`, inline: true },
              { name: "Price", value: `${price}`, inline: true },
              { name: "\u200B", value: "\u200B" }
            );
          }
        }
        interaction.reply({ embeds: [list1], components: [row] });
        const collector = interaction.channel.createMessageComponentCollector({ time: 300000 });
        collector.on("collect", async (i) => {
          if (i.customId == "next") {
            row.components[1].setDisabled(true);
            row.components[0].setDisabled(false);
            await i.editReply({ embeds: [list2], components: [row] });
          } else if (i.customId == "prev") {
            row.components[1].setDisabled(false);
            row.components[0].setDisabled(true);
            await i.editReply({ embeds: [list1], components: [row] });
          }
        });
        break;
    }
  },
};

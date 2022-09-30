const { ApplicationCommandOptionType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
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
    },
  ],

  run: async (client, interaction) => {
    const user = interaction.user;
    switch (interaction.options.getSubcommand()) {
      case 'buy':
        var shop = [];
        var info = JSON.parse(fs.readFileSync("./database/shop.json"));
        shop.push(info);
        const inv = shop[0].inventory;
        var item = interaction.options.getString("item");
        const roleid = inv.find(r => r.name == item).reward;
        item = inv.find(i => i.name == item);
        const guild = client.guilds.cache.get('996664256512655360')
        const member = guild.members.cache.get(user.id);
        const role = guild.roles.cache.get(roleid);
        await member.addRole(role);
        await interaction.reply({ content: `Successfully purchased \`${item.emoji} ${item.name}\`!`, ephemeral: true });
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
        var list1 = new EmbedBuilder()
          .setColor('#00ffff')
          .setAuthor({ name: "Page 1/2" })
          .setTitle(`${shop[0].name}`)
        var list2 = new EmbedBuilder()
          .setColor('#00ffff')
          .setAuthor({ name: "Page 2/2" })
          .setTitle(`${shop[0].name}`)
        for (let i = 0; i < shop[0].inventory.length; i++) {
          let emoji = shop[0].inventory[i].emoji;
          let name = shop[0].inventory[i].name;
          let price = shop[0].inventory[i].price;
          let cur = shop[0].currency;
          if (i < 5) {
            list1.addFields(
              { name: "Name", value: `${emoji} ${name}`, inline: true },
              { name: "Price", value: `${price} ${cur}`, inline: true },
              { name: "\u200B", value: "\u200B", inline: true }
            );
          } else if (i >= 5) {
            list2.addFields(
              { name: "Name", value: `${emoji} ${name}`, inline: true },
              { name: "Price", value: `${price} ${cur}`, inline: true },
              { name: "\u200B", value: "\u200B", inline: true }
            );
          }
        }
        interaction.reply({ embeds: [list1], components: [row] });
        const collector = interaction.channel.createMessageComponentCollector({ time: 90000 });
        collector.on("collect", async (i) => {
          await i.deferUpdate();
          if (i.customId == "shopnext") {
            row.components[1].setDisabled(true);
            row.components[0].setDisabled(false);
            await interaction.editReply({ embeds: [list2], components: [row] });
          } else if (i.customId == "shopprev") {
            row.components[1].setDisabled(false);
            row.components[0].setDisabled(true);
            await interaction.editReply({ embeds: [list1], components: [row] });
          }
        });
        collector.on("end", collected => {
          interaction.editReply({ embeds: [list1], components: [] });
          console.log(`Collected ${collected.size} Items.`);
        });
        break;
    }
  },
};

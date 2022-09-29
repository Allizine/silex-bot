const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const { glob } = require('glob');
const { promisify } = require('node:util');
const promiseGlob = promisify(glob);
module.exports = {
  name: "help",
  description: "Displays the Help message",
  permissions: {
    member: ["SEND_MESSAGES"],
  },

  run: async (client, interaction) => {
    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId("commands")
          .setLabel("Commands")
          .setStyle(ButtonStyle.Primary)
          .setEmoji('🖥️'),
        new ButtonBuilder()
          .setCustomId("general")
          .setLabel("General")
          .setStyle(ButtonStyle.Primary)
          .setEmoji('🆘')
      );
    const embed = new EmbedBuilder()
      .setColor('#00ffff')
      .setTitle("Silex Help Menu")
      .setDescription("Hiya, welcome to the Help Menu!\n\nYou probably only recently discovered this Bot and were wondering, what it was capable off.\n\nWell, below you can find some Buttons that will display some more information. But for now the only Command you can use is this one.")
      .setTimestamp()
    interaction.reply({ embeds: [embed], components: [row] });
    const response = new EmbedBuilder()
      .setColor('#00ffff')
      .setTimestamp()
    const collector = interaction.channel.createMessageComponentCollector({ time: 90000 });
    collector.on("collect", async (i) => {
      await i.deferReply()
      if (i.customId == "commands") {
        response.setTitle("Command List");
        (await promiseGlob(`${process.cwd().replace(/\\/g, '/')}/commands/slash/*/*.js`)).map(async (file) => {
          const command = require(file);
          if(command.permissions && command.permissions.member && command.permissions.member.length && interaction.channel.permissionsFor(interaction.member).has(command.permissions.member)) {
            response.addFields(
              {name: "Name", value: command.name, inline: true},
              {name: "Description", value: command.description, inline: true},
              {name: "\u200B", value: "\u200B", inline: true}
            );
          } 
        });
        i.editReply({ embeds: [response] })
      } else if (i.customId=="general") {
        response.setTitle("Frequently Asked Questions");
        response.setDescription(`Here are the most frequently asked Questions:`)
        response.addFields(
          {name: "1️⃣ I don\'t see any Channels, how do I unlock them?", value: "🅰️ It could be that you haven\'t agreed to our rules yet. You can do so in <#996668536049107035>. Alternatively you might be missing the corresponding roles. Make sure to check out <#996671062232289331>"},
          {name: "2️⃣ Where should I post Questions or Issues?", value: "🅰️ If you have a Question or Issue, simply open a Ticket in <#996669703038713896>"},
          {name: "3️⃣ I would like to support the Server. Where can I do that?", value: "🅰️ You can support us by donating to us on [Patreon](https://patreon.com/silex_community) or by subscribing to a [Membership](https://mee6.xyz/m/996664256512655360)."},
          {name: "4️⃣ Where can I apply to join the Staff team?", value: "🅰️ You can apply by filling out this [form](https://dyno.gg/form/5009ac33)."},
          {name: "5️⃣ Where can I apply to become a GM?", value: "🅰️ You can apply by filling out this [form](https://dyno.gg/form/7e55bbf1)."},
          {name: "6️⃣ I have a Question that isn\'t listed here, where can I find help?", value: "🅰️ For questions not listed here, simply ask in <#996668489664307210> or submit a Ticket in <#996669703038713896>."}
        );
        i.editReply({embeds: [response]});
      }
    });
  },
};

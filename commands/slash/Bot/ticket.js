const { ApplicationCommandOptionType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType } = require('discord.js');
const fs = require('fs');
const log = fs.readFileSync("./ticket-log.json");
module.exports = {
  name: "ticket",
  description: "Creates a Ticket Channel for Questions and Issues.",
  permissions: {
    member: ["SEND_MESSAGES"],
  },
  options: [
    {
      name: "create",
      description: "Creates a new Ticket.",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "title",
          description: "Submit a Title for the Ticket.",
          type: ApplicationCommandOptionType.String,
          required: true,
        },
      ],
    },
    {
      name: "close",
      description: "Closes the Ticket Channel.",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "reason",
          description: "Provide a Reason for closing the Ticket.",
          type: ApplicationCommandOptionType.String,
          required: true,
        },
      ],
    },
  ],

  run: async (client, interaction) => {
    const guild = client.guilds.cache.get('996664256512655360');
    const parent = guild.channels.cache.get('996812880559226983');
    const mod = guild.roles.cache.get("996664607290695740");
    const admin = guild.roles.cache.get("996664542400618566");
    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('close')
          .setLabel("Close Ticket")
          .setStyle(ButtonStyle.Secondary)
          .setEmoji('🔒')
      )
    const help = new EmbedBuilder()
      .setColor('#00ffff')
      .setDescription("Thanks for opening a ticket, please provide your reason for opening the Ticket as well as any evidence below.")
      .setTimestamp()
    switch (interaction.options.getSubcommand()) {
      case 'create':
        const response = new EmbedBuilder()
          .setColor('#00ff20')
          .setTitle(`Ticket #${log.number + 1} opened`)
        const channel = await guild.channels.create({
          parent: parent,
          name: `Ticket #${log.number + 1}`,
          type: ChannelType.GuildText,
          permissionOverwrites: [
            {
              id: interaction.user.id,
              allow: ["VIEW_CHANNEL"]
            },
            {
              id: mod.id,
              allow: ["VIEW_CHANNEL"]
            },
            {
              id: admin.id,
              allow: ["VIEW CHANNEL"]
            }
          ],
        });
        await channel.send({ embeds: [help] });
        await interaction.reply({ embeds: [response], ephemeral: true });
        const collector = channel.createMessageComponentCollector({ time: 21600000 });
        collector.on("collect", async (i) => {
          await i.deferReply();
          if (i.customId == "close") {
            const close = new EmbedBuilder()
              .setColor('#ff0000')
              .setDescription("Closing Ticket: Issue resolved")
            await i.editReply({ embeds: [close] });
          }
        });
        break;
      case 'close':

        break;
    }
  },
};

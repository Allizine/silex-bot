const { glob } = require('glob');
const { promisify } = require('node:util');
const promiseGlob = promisify(glob);
const { EmbedBuilder } = require('discord.js');
const fs = require('fs');
module.exports = {
  name: "commands",
  description: "Lists all available Commands",
  permissions: {
    member: ["SEND_MESSAGES"],
  },

  run: async (client, interaction) => {
    const response = new EmbedBuilder()
      .setColor('#00ffff')
      .setTitle("Command List")
      .setTimestamp()
      (await promiseGlob(`${process.cwd().replace(/\\/g, '/')}/commands/slash/*/*.js`)).map(async (file) => {
        const command = require(file);
        if (command.permissions && command.permissions.member && command.permissions.member.length && !interaction.channel.permissionsFor(interaction.member).has(command.permissions.member)) {
          response.addFields(
            { name: "Name", value: command.name, inline: true },
            { name: "Description", value: command.description, inline: true },
            { name: "\u200B", value: "\u200B", inline: true }
          );
        }
      });

    const channel = interaction.channel;
    await channel.send({ embeds: [response] });
  }
}

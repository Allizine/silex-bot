const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "create",
    description: "create your own channel",
    options: [
      {
          name: "voice",
          type: "SUB_COMMAND",
          description: "create your own voice channel!",
          options: [
            {
                name: "title",
                type: "STRING",
                required: true,
                description: "set the title of the channel"
            },
            {
               name: "member",
               type: "INTEGER",
               required: false,
               description: "select the max amount of people that can join, leave empty for infinity"
            }
          ]
      },
      {
          name: "text",
          type: "SUB_COMMAND",
          description: "create your own text channel!",
          options: [
            {
                name: "title",
                type: "STRING",
                required: true,
                description: "set the title of the channel"
            }
          ]
      },
    ],
  /**
   *
   * @param {CommandInteraction} interaction
   */
  async execute(interaction, client) {
      const {options, member, guild} = interaction;
      const subCommand = options.getSubcommand();
      switch (subCommand) {
        case "voice": {
            const channelOwnerID = member.id;
            const channelName = options.get("title");
            const memberLimit = options.get("member");
            if (memberLimit>0) {
                let voiceChannel = guild.channels.create(channelName, {
                    type: "voice",
                    permissionOverwrites: [
                      {
                          id: channelOwnerID,
                          allow: [PermissionBitField.Flags.ViewChannel,PermissionBitField.Flags.ManageChannels,PermissionBitField.Flags.ManagePermissions]
                      }
                    ]
                });
                
            } else {
                let voiceChannel = guild.channels.create(channelName, {
                    type: "voice",
                    permissionOverwrites: [
                      {
                          id: channelOwnerID,
                          allow: [PermissionBitField.Flags.ViewChannel,PermissionBitField.Flags.ManageChannels,PermissionBitField.Flags.ManagePermissions]
                      }
                    ]
                });
                voiceChannel.userLimit(memberLimit);
            }
        }
        break;
        case "text": {
            const channelOwnerID = member.id;
            const channelName = options.get("title");
            const categoryID = "996810042168856616";
            let textChannel = guild.channels.create(channelName, {
                type: "text",
                parent: categoryID,
                permissionOverwrites: [
                  {
                      id: channelOwnerID,
                      allow: [PermissionBitField.Flags.ViewChannel,PermissionBitField.Flags.ManagePermissions]
                  }
                ]
            });
        }
      }
  }
}

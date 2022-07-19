const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "voice",
    description: "control your own channel",
    options: [
        {
            name: "invite",
            type: "SUB_COMMAND",
            description: "invite people to your channel!",
            options: [
                {
                    name: "member",
                    type: "USER",
                    required: true,
                    description: "select the user"
                }
            ]
        },
            {
                name: "disallow",
                type: "SUB_COMMAND",
                description: "Removes someone's access to the channel",
                options: [
                    {
                        name: "member",
                        type: "USER",
                        required: true,
                        description: "select the user"
                    }
                ]
                
            },
            {
                name: "name",
                type: "SUB_COMMAND",
                description: "name your channel!",
                options: [
                    {
                        name: "text",
                        type: "STRING",
                        required: true,
                        description: "provide a name!"
                    }
                ] 
            },
            {
                name: "public",
                type: "SUB_COMMAND",
                description: "make your channel public",
                options: [
                    {
                        name: "turn",
                        type: "STRING",
                        required: true,
                        description: "open your channel!",
                        choices: [
                            {name: "on", value: "on"},
                            {name: "off", value: "off"}
                        ]
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
            const voiceChannel = member.voice.channel
            const embed = new MessageEmbed().setColor("GREEN");
            const ownedChannel = client.voiceGenerator.get(member.id);

            if(!voiceChannel)
            return interaction.reply({embeds: [Embed.setDescription("You are not in a voice channel.").setColor("RED")], ephemeral: true})
       if (!ownedChannel || voiceChannel.id !== ownedChannel)
       return interaction.reply({embeds: [Embed.setDescription("You do not own this, or any channel.").setColor("RED")], ephemeral: true})
       

       switch(subCommand){
        case "name" : {
            const newName = options.getString("text");
            if (newName > 22 || newName.length < 1)
            return interaction.reply({embeds: [Embed.setDescription("Name cannot exceed the 22 character limit.").setColor("RED")], ephemeral: true})
            voiceChannel.edit({ name: newName})
        }
        break;
        case "invite" : {
            const targetMember = options.getMember("member")
            voiceChannel.permissionOverwrites.edit(targetMember, {CONNECT: true});

            targetMember.send({embeds: [Embed.setDescription(`${member} has invited you to <#${voiceChannel.id}>`)]});
            interaction.reply({embeds: [Embed.setDescription(`${targetMember} has been invited.`)], ephemeral: true})
        }
        break;
        case "disallow" : {
            const targetMember = options.getMember("member")
            voiceChannel.permissionOverwrites.edit(targetMember, {CONNECT: false});

            if(targetMember.voice.channel && targetMember.voiceChannel.id === voiceChannel.id) targetMember.voice.setChannel(null);
            interaction.reply({embeds: [Embed.setDescription(`${targetMember} has been removed from this channel.`).setColor("RED")], ephemeral: true});

        }
        break;
        case "public" : {
            const turnChoice = options.getString("turn");
            switch(turnChoice) {
                case "on" : {
                    voiceChannel.permissionOverwrites.edit(guild.id, {CONNECT: null})
                    interaction.reply({embeds: [Embed.setDescription("The channel is now Public").setColor("GREEN")], ephemeral: true})

                }
break;
                case "off" : {
                    voiceChannel.permissionOverwrites.edit(guild.id, {CONNECT: false})
                    interaction.reply({embeds: [Embed.setDescription("The channel is now closed".setColor("GREEN"))], ephemeral: true})

                }
                break;
            }
        }
            break;
        }
    }
}
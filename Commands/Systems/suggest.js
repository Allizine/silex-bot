const {CommandInteraction, MessageEmbed} = require("discord.js")


module.exports = {
    name: "suggest",
    description: "Create a suggestion",
    options: [
        {
            name: "type",
            description: "select the type",
            required: true,
            type: "STRING",
            choices: [
                {
                    name: "Command",
                    value: "Command"
                },
                {
                    name: "Event",
                    value: "Event"
                },
                {
                    name: "System",
                    value: "System"
                }
            ]
        },
        {
            name: "Name",
            description: "Provide a name for your suggestion.",
            type: "STRING",
            required: true
        },
        {
            name: "Concept",
            description: "Tell us what you'd like to see",
            type: "STRING",
            required: true
        }
    ],
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
      const {options } = interaction;
      const type = options.getString("type")
      const name = options.getString("Name")
      const description = option.getString("Concept");

      const Response = new MessageEmbed()
        .setColor("PURPLE")
        .setDescription(`${interaction.member} has suggested a ${type}.`)
        .addField("name", `${name}`, true)
        .addField("Suggestion", `${description}`, true)
        const message = await interaction.reply({embeds: [Response], fetchReply: true})
        message.react("EMOJI_ID")
        message.react("EMOJI_ID")
    }
}
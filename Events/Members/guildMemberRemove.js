const {MessageEmbed, WebhookClient, GuildMember} = require("discord.js")


module.exports = {
    name: "guildMemberRemove",


    /**
     * 
     * @param {GuildMember} member 
     */
    execute(member) {
        const {user, guild } = member

        member.roles.add("PLACEHOLDER");

        const Leave = new WebhookClient({
            id: PLACEHOLDER,
            token: PLACEHOLDER
        });

        const Bye = new MessageEmbed()
            .setColor("PURPLE")
            .setAuthor(user.tag, user.avatarURL({dynamic: true, size: 512}))
            .setThumbnail(user.avatarURL({dynamic: true, size: 512}))
            .setDescription(`
            Welcome ${member} to **${guild.name}** c:\n 
            Account Created <t:${parseint(user.createdTimestamp / 1000)}:R> \n Latest member count: **${guild.memberCount}**`)
            .setFooter(`ID: ${user.id}`)
        
            Leave.send({embeds: [Bye]})
    }
}
module.exports = {
  name: 'ready',
  /**
    * 
    * @param {import('../../structures/lib/DiscordClient')} client 
    */
  run: (client) => {
    console.log("Client is ready.");
    const MainGuild = client.guilds.cache.get("996664256512655360");
    const commandsArray = []
    client.slashCommands.forEach(cmd => {
      commandsArray.push(cmd)
    });
    MainGuild.commands.set(commandsArray);
    client.user.setPresence(client.config.presence);
  }
}

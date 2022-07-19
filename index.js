// require discordjs classes
const fs = require('node:fs');
const { Client, Collection, Intents } = require('discord.js');
const { token, Database } = require('./config.json');
const client = new Client({intents: 8});


client.commands = new Collection
require("./Handlers/Events")(client);
require("./Handlers/Commands")(client);



// Login to Discord with your bot token
 client.login(token);




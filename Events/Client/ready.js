const { Client } = require("discord.js")
const mongoose = require("mongoose")
const { Database } = require("../../config.json")

module.exports = {
    name: "ready",
    once: true,
    execute(client) {
        console.log("The Client is now ready!")
        client.user.setActivity("Hello!" ,{type: "WATCHING"})

        if(!Database) return;
        mongoose.connect(Database, {
            useNewURLParser: true,
            useUnifiedTopology: true
        }).then (() => {
            console.log("Bot Connected to DB")
        }).catch((error) => {
            console.log(err)
        });
    }
} 
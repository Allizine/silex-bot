const { Perms } = require("../Validation/Permissions")
const { Client } = require("discord.js")
const {promisify } = require("util")
const { glob } = require("glob")
const Ascii = require("ascii-table")

const PG = promisify(glob)

module.exports = async (client) => {
    const Table = new Ascii("Commands Loaded");

    commandsArray = [];


    (await PG(`${(process.cwd().replace(/\\/g, "/"))}/Commands/*/*.js`)).map(async (file) => {
        const command = require(file);

        if (!command.name)
        return Table.addRow(file.split('/')[7], "Failed!", "Missing a name.")

        if(!command.description)
        return Table.addRow(command.name, "Failed", "Missing a Desc")

        if(command.permission) {
            if (Perms.includes(command.permission))
            command.defaultPermission = false;
            else
            return Table.addRow(command.name, "Failed", "Permission is invalid")
        }

        client.commands.set(command.name, command);
        commandsArray.push(command);

        await Table.addRow(command.name, "Successful")
    });

    console.log(Table.toString());


    // Perms Check

    client.on("Ready", async () => {
        const MainGuild = await client.guild.cache.get("851559812402511962");
        MainGuild.commands.set(CommandsArray).then(async (command) => {
            const Roles = (commandName) => {
                const cmdPerms = CommandsArray.find((c => c.name === command.name).permission);
                if(!cmdPerms) return null;
                return MainGuild.role.cache.filter((r) => r.permissions.has(cmdPerms))
            }

            const fullPermissions = command.reduce((accumulator, r) =>{
                const roles = Roles(r.name);
                if(!roles) return accumulator;


                const permissions = roles.reduce((a, r) => {
                    return [...a, {id: r.id, type: "ROLE", permission: true}]
                }, []);
                return [...accumulator, {id: r.id, permissions}]
            }, []);
            await MainGuild.commands.permissions.set({ fullPermissions });
                });
            });
        };
    

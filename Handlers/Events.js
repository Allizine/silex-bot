const { Events } = require("../Validation/EventNames");
const { promisify } = require("util");
const glob = require("glob");
const Ascii = require("ascii-table");

const PG = promisify(glob)


module.exports = async (client) => {
    const Table = new Ascii("Events Loaded");

    (await PG(`${(process.cwd().replace(/\\/g, "/"))}/Events/*/*.js`)).map(async (file) => {
        const event = require(file);

        if(!Events.includes(event.name || !event.name)) {
            const L = file.split('/');
            await Table.addRow(`${event.name || "Missing!"}`, `🛑 Event name is either invalid or missing ${L[6] + L[7]}`);
            return
        }
        if(event.once) {
            client.once(event.name, (...args) => event.execute(...args,client));
        } else {
            client.on(event.name, (...args) => event.execute(...args, client));
        };

        await Table.addRow(event.name, "✅Success!")
    });
console.log(Table.toString())

}
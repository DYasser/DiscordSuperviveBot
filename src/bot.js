require('dotenv').config();
const token = process.env.token;

const { Client, Collection, GatewayIntentBits } = require('discord.js'); //Gateway Intent Bits??
const fs = require('fs');

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages
    ],
}); 

client.commands = new Collection();
client.commandArray = [];
// clients.color

const functionFolders = fs.readdirSync(`./src/functions`);

for (const folder of functionFolders) {
    const functionFiles = fs.readdirSync(`./src/functions/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of functionFiles) {
        require(`./functions/${folder}/${file}`)(client);
    }
}

client.handleEvents();
client.handleCommands();
client.login(token);
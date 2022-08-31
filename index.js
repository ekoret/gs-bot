require('dotenv').config();
// Require the necessary discord.js classes
const { Client, GatewayIntentBits } = require('discord.js');
const TOKEN = process.env.BOT_TOKEN;

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Bot is ready!');
});

// Login to Discord with your client's token
client.login(TOKEN);

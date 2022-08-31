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

client.on('interactionCreate', async (interaction) => {
	if (!interaction.isChatInputCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'server') {
		await interaction.reply(
			`Server Name: ${interaction.guild.name}\nTotal Members: ${interaction.guild.memberCount}`
		);
	} else if (commandName === 'user') {
		await interaction.reply(
			`Your tag: ${interaction.user.tag}\nYour ID: ${interaction.user.id}`
		);
	}
});

// Login to Discord with your client's token
client.login(TOKEN);

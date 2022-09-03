const {
	Client,
	DiscordHelper,
	GatewayIntentBits,
} = require('./helpers/DiscordHelper');
const config = require('./config');
const { DatabaseHelper } = require('./helpers/DatabaseHelper');

function main() {
	DatabaseHelper.connectDb();

	const client = new Client({ intents: [GatewayIntentBits.Guilds] });

	// Handling commands
	DiscordHelper.readCommandFiles(client);

	// When the client is ready, run this code (only once)
	client.once('ready', () => {
		console.log('Bot is ready!');
	});

	client.on('interactionCreate', async (interaction) => {
		if (interaction.user.bot || !interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) return;

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({
				content: 'There was an error while executing this command!',
				ephemeral: true,
			});
		}
	});

	// Login to Discord with your client's token
	client.login(config.token);
}

main();

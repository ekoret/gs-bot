import Discord, {
	Client,
	GatewayIntentBits,
	config,
} from './helpers/Discord.js';
import Database from './helpers/Database.js';
const main = async () => {
	// Handling DB connection
	Database.connectDb();

	const client = new Client({ intents: [GatewayIntentBits.Guilds] });

	// Handling commands
	await Discord.readCommandFiles(client);

	client.once('ready', () => {
		console.log('Bot is ready!');
	});

	// This is listening for every interaction. In the future I should split up the interactions by event handling.
	client.on('interactionCreate', async (interaction) => {
		// Scoping the bot to only be used in specific channels
		if (!Discord.isInteractionSafe(interaction)) {
			await interaction.reply({
				content: 'You cannot use the bot outside of the #bot-commands channel!',
				ephemeral: true,
			});
			return;
		}

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

	client.login(config.token);
};

main();

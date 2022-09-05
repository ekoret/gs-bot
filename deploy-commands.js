import DiscordHelper, {
	Routes,
	REST,
	config,
} from './helpers/DiscordHelper.js';

const CLIENT_ID = config.client;
const TOKEN = config.token;
const GUILD_ID = config.guildId;

const main = async () => {
	const commands = await DiscordHelper.readCommandFilesDeploy();

	const rest = new REST({ version: '10' }).setToken(TOKEN);

	rest
		.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
			body: commands,
		})
		.then((data) =>
			console.log(
				`Successfully registered ${data.length} application commands.`
			)
		)
		.catch(console.error);

	// Removing Guild Based Commands
	// rest
	// 	.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: [] })
	// 	.then(() => console.log('Successfully deleted all guild commands.'))
	// 	.catch(console.error);

	// Removing Global Based Commands
	// rest
	// 	.put(Routes.applicationCommands(CLIENT_ID), { body: [] })
	// 	.then(() => console.log('Successfully deleted all application commands.'))
	// 	.catch(console.error);
};

main();

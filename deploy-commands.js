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
};

main();

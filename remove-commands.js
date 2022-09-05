import { Routes, REST, config } from './helpers/Discord.js';

const CLIENT_ID = config.client;
const TOKEN = config.token;
const GUILD_ID = config.guildId;

const main = async () => {
	const rest = new REST({ version: '10' }).setToken(TOKEN);

	// Removing Guild Based Commands
	await rest
		.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: [] })
		.then(() => console.log('Successfully deleted all guild commands.'))
		.catch(console.error);

	// Removing Global Based Commands
	await rest
		.put(Routes.applicationCommands(CLIENT_ID), { body: [] })
		.then(() => console.log('Successfully deleted all application commands.'))
		.catch(console.error);
};

main();

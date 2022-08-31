const config = require('./config');
const { Routes, REST, readCommandFilesDeploy } = require('./DiscordHelper');

const CLIENT_ID = config.client;
const TOKEN = config.token;
const GUILD_ID = config.guildId;

function main() {
	const commands = readCommandFilesDeploy();

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

	//removing commands
	//guild based
	// rest
	// 	.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: [] })
	// 	.then(() => console.log('Successfully deleted all guild commands.'))
	// 	.catch(console.error);

	//global based
	// rest
	// 	.put(Routes.applicationCommands(CLIENT_ID), { body: [] })
	// 	.then(() => console.log('Successfully deleted all application commands.'))
	// 	.catch(console.error);
}

main();

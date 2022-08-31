const config = require('./config');
const { fs, path } = require('./NodeHelper');
const { Routes, REST } = require('./DiscordHelper');

const CLIENT_ID = config.client;
const TOKEN = config.token;
const GUILD_ID = config.guildId;

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs
	.readdirSync(commandsPath)
	.filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(TOKEN);

//for registering global commands
rest
	.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
		body: commands,
	})
	.then((data) =>
		console.log(`Successfully registered ${data.length} application commands.`)
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

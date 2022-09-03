const { fs, path } = require('./NodeHelper');

const {
	SlashCommandBuilder,
	Client,
	Collection,
	GatewayIntentBits,
	Routes,
	PermissionFlagsBits,
} = require('discord.js');

const { REST } = require('@discordjs/rest');

class DiscordHelper {
	static readCommandFiles(client) {
		client.commands = new Collection();
		const commandsPath = path.join(__dirname, '../', 'commands');
		const commandFiles = fs
			.readdirSync(commandsPath)
			.filter((file) => file.endsWith('.js'));

		for (const file of commandFiles) {
			const filePath = path.join(commandsPath, file);
			const command = require(filePath);
			// Set a new item in the Collection
			// With the key as the command name and the value as the exported module
			client.commands.set(command.data.name, command);
		}
	}

	static readCommandFilesDeploy() {
		const commands = [];
		const commandsPath = path.join(__dirname, '../', 'commands');
		const commandFiles = fs
			.readdirSync(commandsPath)
			.filter((file) => file.endsWith('.js'));

		for (const file of commandFiles) {
			const filePath = path.join(commandsPath, file);
			const command = require(filePath);
			commands.push(command.data.toJSON());
		}
		return commands;
	}

	static getTableText(type) {
		let table;
		if (type === 'commands') {
			const { commands } = require('../tables');
			table = commands;
		} else if (type === 'rewards') {
			const { rewards } = require('../tables');
			table = rewards;
		}

		let commandText = '';
		for (const value in table) {
			const commandName = value;
			const commandDescription = table[value];

			commandText += `\`${commandName} - ${commandDescription}\`\n`;
		}
		return commandText;
	}
}

module.exports = {
	SlashCommandBuilder,
	Client,
	Collection,
	GatewayIntentBits,
	Routes,
	REST,
	DiscordHelper,
	PermissionFlagsBits,
};

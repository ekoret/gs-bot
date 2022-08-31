const { fs, path } = require('./NodeHelper');

const {
	SlashCommandBuilder,
	Client,
	Collection,
	GatewayIntentBits,
	Routes,
} = require('discord.js');

const { REST } = require('@discordjs/rest');

function readCommandFiles(client) {
	client.commands = new Collection();
	const commandsPath = path.join(__dirname, 'commands');
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

function readCommandFilesDeploy() {
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
	return commands;
}

function getCommandLegendText() {
	const commandsLegend = require('./commandsLegend');

	let commandText = '';
	for (let value in commandsLegend) {
		let commandName = value;
		let commandDescription = commandsLegend[value];

		commandText += `\`${commandName} - ${commandDescription}\`\n`;
	}
	return commandText;
}

module.exports = {
	SlashCommandBuilder,
	Client,
	Collection,
	GatewayIntentBits,
	Routes,
	REST,
	readCommandFiles,
	readCommandFilesDeploy,
	getCommandLegendText,
};

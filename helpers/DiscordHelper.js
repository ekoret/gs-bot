import { fs, path, fileURLToPath } from '../helpers/NodeHelper.js';

import {
	SlashCommandBuilder,
	Client,
	Collection,
	GatewayIntentBits,
	Routes,
	PermissionFlagsBits,
} from 'discord.js';

import { REST } from '@discordjs/rest';
import config from '../config.js';

import {
	commands as commandsTable,
	rewards as rewardsTable,
} from '../helpers/tables.js';

export default class DiscordHelper {
	static async readCommandFiles(client) {
		const __filename = fileURLToPath(import.meta.url);
		const __dirname = path.dirname(__filename);

		client.commands = new Collection();
		const commandsPath = path.join(__dirname, '../', 'commands');
		const commandFiles = fs
			.readdirSync(commandsPath)
			.filter((file) => file.endsWith('.js'));
		for (const file of commandFiles) {
			const data = await import(`../commands/${file}`);
			const command = data.default;
			client.commands.set(command.data.name, command);
		}
	}

	static async readCommandFilesDeploy() {
		const __filename = fileURLToPath(import.meta.url);
		const __dirname = path.dirname(__filename);

		const commands = [];
		const commandsPath = path.join(__dirname, '../', 'commands');
		const commandFiles = fs
			.readdirSync(commandsPath)
			.filter((file) => file.endsWith('.js'));

		for (const file of commandFiles) {
			const data = await import(`../commands/${file}`);
			const command = data.default;
			commands.push(command.data.toJSON());
		}
		return commands;
	}

	static async getTableText(type) {
		let table;
		if (type === 'commands') {
			table = commandsTable;
		} else if (type === 'rewards') {
			table = rewardsTable;
		}

		let commandText = '';
		for (const value in table) {
			const commandName = value;
			const commandDescription = table[value];

			commandText += `\`${commandName} - ${commandDescription}\`\n`;
		}
		return commandText;
	}

	/**
	 * This method will need to be split up in the future by handling events
	 */
	static isInteractionSafe(interaction) {
		if (
			!interaction.user.bot &&
			interaction.isChatInputCommand() &&
			(interaction.channelId === config.botChannel ||
				interaction.channelId === config.adminChannel)
		) {
			return true;
		} else {
			return false;
		}
	}
}

export {
	REST,
	SlashCommandBuilder,
	Client,
	Collection,
	GatewayIntentBits,
	Routes,
	PermissionFlagsBits,
	config,
};

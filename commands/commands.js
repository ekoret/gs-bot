import DiscordHelper, {
	SlashCommandBuilder,
} from '../helpers/DiscordHelper.js';
import EmbedHelper from '../helpers/EmbedHelper.js';

export default {
	data: new SlashCommandBuilder()
		.setName('commands')
		.setDescription('View the list of commands.'),
	async execute(interaction) {
		const embed = EmbedHelper.createEmbed('List of Commands', ' ');

		const commandText = await DiscordHelper.getTableText('commands');

		embed.setDescription(
			`View the list of available commands\n\n${commandText}`
		);
		await interaction.reply({ embeds: [embed] });
	},
};

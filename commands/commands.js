import Discord, { SlashCommandBuilder, Embed } from '../helpers/Discord.js';

export default {
	data: new SlashCommandBuilder()
		.setName('commands')
		.setDescription('View the list of commands.'),
	async execute(interaction) {
		const commandText = await Discord.getTableText('commands');

		const embed = new Embed().createEmbed('List of Commands', ' ');

		embed.setDescription(
			`View the list of available commands\n\n${commandText}`
		);
		await interaction.reply({ embeds: [embed] });
	},
};

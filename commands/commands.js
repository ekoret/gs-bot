import Discord, { SlashCommandBuilder, Embed } from '../helpers/Discord.js';

export default {
	data: new SlashCommandBuilder()
		.setName('commands')
		.setDescription('View the list of commands.'),
	async execute(interaction) {
		const commandText = await Discord.getTableText('commands');

		const embed = new Embed(
			'List of Commands',
			`View the list of available commands\n\n${commandText}`
		).getEmbed();

		await interaction.reply({ embeds: [embed] });
	},
};

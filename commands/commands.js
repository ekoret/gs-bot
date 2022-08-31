/*
    To edit the list of commands when using the /command command, edit the commandsLegend.js file.
*/
const {
	SlashCommandBuilder,
	getCommandLegendText,
} = require('../DiscordHelper');
const createEmbed = require('../EmbedHelper');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('commands')
		.setDescription('View the list of commands.'),
	async execute(interaction) {
		const embed = createEmbed('List of Commands', ` `);

		const commandText = getCommandLegendText();

		embed.setDescription(
			`View the list of available commands\n\n${commandText}`
		);

		await interaction.reply({ embeds: [embed] });
	},
};

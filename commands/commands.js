const {
	SlashCommandBuilder,
	DiscordHelper,
} = require('../helpers/DiscordHelper');
const EmbedHelper = require('../helpers/EmbedHelper');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('commands')
		.setDescription('View the list of commands.'),
	async execute(interaction) {
		const embed = EmbedHelper.createEmbed('List of Commands', ' ');

		const commandText = DiscordHelper.getTableText('commands');

		embed.setDescription(
			`View the list of available commands\n\n${commandText}`
		);

		await interaction.reply({ embeds: [embed] });
	},
};

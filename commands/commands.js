const { SlashCommandBuilder } = require('../DiscordHelper');
const createEmbed = require('../EmbedHelper');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('commands')
		.setDescription('View the list of available commands'),
	async execute(interaction) {
		const embed = createEmbed('Commands', `Here's a list of commands.`);
		embed.addFields({ name: 'commands', value: 'Show all commands' });

		await interaction.reply({ embeds: [embed] });
	},
};

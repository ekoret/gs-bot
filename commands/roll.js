const { SlashCommandBuilder } = require('../DiscordHelper');
const createEmbed = require('../EmbedHelper');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roll')
		.setDescription('Get a chance to receive free credits!'),
	async execute(interaction) {
		const embed = createEmbed('Congratulations!', `You just rolled a`);

		await interaction.reply({ embeds: [embed] });
	},
};

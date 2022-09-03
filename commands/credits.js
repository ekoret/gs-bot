const {
	SlashCommandBuilder,
	PermissionFlagsBits,
} = require('../helpers/DiscordHelper');
const EmbedHelper = require('../helpers/EmbedHelper');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('credits')
		.setDescription('Add or subtract credits. Admins only.')
		.setDefaultMemberPermissions(
			PermissionFlagsBits.KickMembers | PermissionFlagsBits.BanMembers
		),

	async execute(interaction) {
		const embed = EmbedHelper.createEmbed('Admin Only Command', 'Hello');

		await interaction.reply({ embeds: [embed] });
	},
};

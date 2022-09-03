const {
	SlashCommandBuilder,
	PermissionFlagsBits,
} = require('../helpers/DiscordHelper');
const EmbedHelper = require('../helpers/EmbedHelper');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('credits')
		.setDescription('Add or minus credits from users. Admins only.')
		.addStringOption((option) =>
			option
				.setName('method')
				.setDescription('Add or minus from users credits')
				.setRequired(true)
				.addChoices(
					{ name: 'add', value: 'add' },
					{ name: 'minus', value: 'minus' }
				)
		)
		.addStringOption((option) =>
			option
				.setName('amount')
				.setDescription('The amount of credits to add or minus')
				.setRequired(true)
		)
		.addUserOption((option) =>
			option.setName('user').setDescription('The target user').setRequired(true)
		)
		.setDefaultMemberPermissions(
			PermissionFlagsBits.KickMembers | PermissionFlagsBits.BanMembers
		),
	async execute(interaction) {
		const embed = EmbedHelper.createEmbed(
			'Credits Manager',
			'Add or subtract credits from users.'
		);

		await interaction.reply({
			embeds: [embed],
			ephemeral: true,
		});
	},
};

/* eslint-disable indent */
const { findUserById } = require('../controllers/userController');
const {
	SlashCommandBuilder,
	PermissionFlagsBits,
} = require('../helpers/DiscordHelper');
const EmbedHelper = require('../helpers/EmbedHelper');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('check')
		.setDescription(
			'Check the user target data from the database. Admins only.'
		)
		.addUserOption((option) =>
			option.setName('user').setDescription('The target user').setRequired(true)
		)
		.setDefaultMemberPermissions(
			PermissionFlagsBits.KickMembers | PermissionFlagsBits.BanMembers
		),
	async execute(interaction) {
		const userInteraction = interaction.options.getUser('user');

		const user = await findUserById(userInteraction.id);

		if (user !== null) {
			const userInfoEmbed = EmbedHelper.getUserInfoEmbed(user);
			interaction.reply({ embeds: [userInfoEmbed] });
		} else {
			const errorEmbed = EmbedHelper.createEmbed(
				'Could Not Find User',
				`Could not find any data for the user ${userInteraction.username}`
			);
			interaction.reply({ embeds: [errorEmbed] });
		}
	},
};

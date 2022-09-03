/* eslint-disable indent */
const { handleCredits } = require('../controllers/userController');
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
		const amount = interaction.options.getString('amount');
		const user = interaction.options.getUser('user');
		const method = interaction.options.get('method').value;

		const data = await handleCredits(user, method, amount);

		const methodText = method === 'add' ? 'added' : 'subtracted'; // needs better name
		const toFrom = method === 'add' ? 'to' : 'from'; // needs better name

		if (data !== null) {
			const embed = EmbedHelper.createEmbed(
				'Credits Manager',
				`You've successfully \`${methodText} ${amount} credits\` ${toFrom} \`${user.username}\`.\n\n\`${user.username}\` went from \`${data.previousTotalCredits}\` to \`${data.updatedUser.totalCredits}.\``
			);

			await interaction.reply({
				embeds: [embed],
				ephemeral: true,
			});
		} else {
			const embed = EmbedHelper.createEmbed(
				'Credits Manager',
				`Could not find user ${user.username} in database. Nothing was updated.`
			);

			await interaction.reply({
				embeds: [embed],
				ephemeral: true,
			});
		}
	},
};

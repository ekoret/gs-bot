import User from '../controllers/User.js';
import {
	SlashCommandBuilder,
	PermissionFlagsBits,
	Embed,
} from '../helpers/Discord.js';

export default {
	data: new SlashCommandBuilder()
		.setName('credits')
		.setDescription('Add or minus credits from users. Admins only.')
		.addStringOption((option) =>
			option
				.setName('method')
				.setDescription('Add, minus, or set credits for a user')
				.setRequired(true)
				.addChoices(
					{ name: 'add', value: 'add' },
					{ name: 'minus', value: 'minus' },
					{ name: 'set', value: 'set' }
				)
		)
		.addIntegerOption((option) =>
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
		const amount = interaction.options.getInteger('amount');
		const user = interaction.options.getUser('user');
		const method = interaction.options.get('method').value;

		const data = await User.handleCredits(user, method, amount);

		if (data !== null) {
			const methodText = (methodType) => {
				if (methodType === 'set') {
					return ['set', 'for'];
				} else if (methodType === 'add') {
					return ['added', 'to'];
				} else if (methodType === 'minus') {
					return ['subtracted', 'from'];
				}
			};

			const [action, text] = methodText(method);
			const { updatedUser, previousTotalCredits } = data;
			const embedText = `You've successfully \`${action} ${amount} credits\` ${text} \`${updatedUser.username}\`.\n\n\`${updatedUser.username}\` went from \`${previousTotalCredits}\` to \`${updatedUser.totalCredits}.\``;

			const embed = new Embed().createEmbed('Credits Manager', embedText);

			await interaction.reply({
				embeds: [embed],
				ephemeral: true,
			});
		} else {
			const embed = new Embed().createEmbed(
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

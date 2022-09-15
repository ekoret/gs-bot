import User from '../controllers/User.js';
import Discord, {
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
		const input = {
			amount: interaction.options.getInteger('amount'),
			user: interaction.options.getUser('user'),
			method: interaction.options.get('method').value,
		};

		const data = await User.handleCredits(input);

		if (data !== null) {
			const [action, text] = Discord.getMethodText(input.method);
			const { updatedUser, previousTotalCredits } = data;

			const embedText = `You've successfully \`${action} ${input.amount} credits\` ${text} \`${updatedUser.username}\`.\n\n\`${updatedUser.username}\` went from \`${previousTotalCredits}\` to \`${updatedUser.totalCredits}.\``;
			const embed = new Embed('Credits Manager', embedText).getEmbed();

			await interaction.reply({
				embeds: [embed],
				ephemeral: true,
			});
		} else {
			const embed = new Embed(
				'Credits Manager',
				`Could not find user ${input.user.username} in database. Nothing was updated.`
			).getEmbed();

			await interaction.reply({
				embeds: [embed],
				ephemeral: true,
			});
		}
	},
};

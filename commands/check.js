import User from '../controllers/User.js';
import {
	SlashCommandBuilder,
	PermissionFlagsBits,
	Embed,
} from '../helpers/Discord.js';

export default {
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

		const user = await User.findUserById(userInteraction.id);

		if (user !== null) {
			const userInfoEmbed = Embed.getUserInfoEmbed(user);
			interaction.reply({ embeds: [userInfoEmbed] });
		} else {
			const errorEmbed = new Embed().createEmbed(
				'Could Not find User',
				`Could not find any data for the user ${userInteraction.username}`
			);

			interaction.reply({ embeds: [errorEmbed] });
		}
	},
};

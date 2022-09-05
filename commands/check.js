/* eslint-disable indent */
import { findUserById } from '../controllers/userController.js';
import {
	SlashCommandBuilder,
	PermissionFlagsBits,
} from '../helpers/DiscordHelper.js';

import EmbedHelper from '../helpers/EmbedHelper.js';

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

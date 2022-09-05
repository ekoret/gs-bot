import {
	findUserById,
	rewardUser,
	userCanRoll,
	createUser,
} from '../controllers/userController.js';
import { SlashCommandBuilder } from '../helpers/DiscordHelper.js';
import Embed from '../helpers/Embed.js';

export default {
	data: new SlashCommandBuilder()
		.setName('roll')
		.setDescription('Get a chance to receive free credits!'),
	async execute(interaction) {
		const user = await findUserById(interaction.user.id);

		if (user === null) {
			// There was no user found, we'll need to create one, add a reward.
			const { newUser, reward } = await createUser(
				interaction.user.id,
				interaction.user.username
			);

			const newUserEmbed = Embed.getUserRolledEmbed(newUser, reward);

			await interaction.reply({ embeds: [newUserEmbed] });
		} else if (!userCanRoll(user.weekly)) {
			// We need to check if the user is timed-out.
			const cannotRollEmbed = Embed.getTimedOutEmbed(user);

			await interaction.reply({ embeds: [cannotRollEmbed] });
		} else {
			// There was a user found, so we can update the user.
			const { updatedUser, reward } = await rewardUser(user);

			const updatedUserRollEmbed = Embed.getUserRolledEmbed(
				updatedUser,
				reward
			);

			await interaction.reply({ embeds: [updatedUserRollEmbed] });
		}
	},
};

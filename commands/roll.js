import User from '../controllers/User.js';
import { SlashCommandBuilder, Embed } from '../helpers/Discord.js';

export default {
	data: new SlashCommandBuilder()
		.setName('roll')
		.setDescription('Get a chance to receive free credits!'),
	async execute(interaction) {
		const user = await User.findUserById(interaction.user.id);

		if (user === null) {
			const newUser = new User(interaction.user.id, interaction.user.username);

			const newUserEmbed = Embed.getUserRolledEmbed(
				newUser,
				newUser.totalCredits
			);

			await interaction.reply({ embeds: [newUserEmbed] });
		} else if (!User.canUserRoll(user.weekly)) {
			// We need to check if the user is timed-out.
			const cannotRollEmbed = Embed.getTimedOutEmbed(user);

			await interaction.reply({ embeds: [cannotRollEmbed] });
		} else {
			// There was a user found, so we can update the user.
			const { updatedUser, reward } = await User.rewardUser(user);

			const updatedUserRollEmbed = Embed.getUserRolledEmbed(
				updatedUser,
				reward
			);

			await interaction.reply({ embeds: [updatedUserRollEmbed] });
		}
	},
};

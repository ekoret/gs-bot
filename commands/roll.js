const {
	findUser,
	rewardUser,
	userCanRoll,
	createUser,
} = require('../controllers/userController');
const { SlashCommandBuilder } = require('../helpers/DiscordHelper');
const EmbedHelper = require('../helpers/EmbedHelper');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roll')
		.setDescription('Get a chance to receive free credits!'),
	async execute(interaction) {
		const id = interaction.user.id;

		const user = await findUser(id);

		if (user === null) {
			// There was no user found, we'll need to create one, add a reward.
			const username = interaction.user.username;

			const { newUser, reward } = await createUser(id, username);
			const newUserEmbed = EmbedHelper.getUserRolledEmbed(newUser, reward);
			await interaction.reply({ embeds: [newUserEmbed] });
		} else if (!userCanRoll(user.weekly)) {
			// We need to check if the user is timed-out.
			const cannotRollEmbed = EmbedHelper.getTimedOutEmbed(user);
			await interaction.reply({ embeds: [cannotRollEmbed] });
		} else {
			// There was a user found, so we can update the user.
			const { updatedUser, reward } = await rewardUser(user);
			const updatedUserRollEmbed = EmbedHelper.getUserRolledEmbed(
				updatedUser,
				reward
			);
			await interaction.reply({ embeds: [updatedUserRollEmbed] });
		}
	},
};

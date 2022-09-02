const {
	findUser,
	rewardUser,
	userCanRoll,
} = require('../controllers/userController');
const { SlashCommandBuilder } = require('../DiscordHelper');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roll')
		.setDescription('Get a chance to receive free credits!'),
	async execute(interaction) {
		const id = interaction.user.id;

		const user = await findUser(id);

		if (user === null) {
			//There was no user found, we'll need to create one.
			await interaction.reply('');
		} else if (!userCanRoll(user)) {
			//We need to check if the user is timed-out.
			await interaction.reply('You cannot roll!');
		} else {
			//There was a user found, so we can update the user.
			const { updatedUser, reward } = await rewardUser(user);
			console.log({ updatedUser, reward });
			await interaction.reply('credits added');
		}
	},
};

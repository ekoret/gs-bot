const createUser = require('../controllers/modelController');
const { SlashCommandBuilder } = require('../DiscordHelper');
const createEmbed = require('../EmbedHelper');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roll')
		.setDescription('Get a chance to receive free credits!'),
	async execute(interaction) {
		// const embed = createEmbed('Congratulations!', `You just rolled a`);

		createUser(interaction.user.id, interaction.user.username, 10);

		await interaction.reply('New user added to db');
	},
};

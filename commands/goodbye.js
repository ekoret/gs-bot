const { SlashCommandBuilder } = require('../DiscordHelper');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('goodbye')
		.setDescription('Replies with goodbye!'),
	async execute(interaction) {
		await interaction.reply('Goodbye!');
	},
};

const { SlashCommandBuilder } = require('../DiscordHelper');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hello')
		.setDescription('Replies with hello!'),
	async execute(interaction) {
		await interaction.reply('Hello!');
	},
};

const { SlashCommandBuilder } = require('../DiscordHelper');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('greetings')
		.setDescription('Replies with a greeting!'),
	async execute(interaction) {
		await interaction.reply('HelloOOOoooooOOOOoooo!');
	},
};

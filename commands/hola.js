const { SlashCommandBuilder } = require('../DiscordHelper');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hola')
		.setDescription('Replies with an hola!'),
	async execute(interaction) {
		await interaction.reply('HOOLA!!');
	},
};

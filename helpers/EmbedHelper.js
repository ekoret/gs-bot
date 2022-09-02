const config = require('../config');
const { EmbedBuilder } = require('discord.js');

class EmbedHelper {
	static createEmbed(title, description) {
		const embed = new EmbedBuilder()
			.setColor('#046738')
			.setTitle(title)
			.setDescription(description)
			.setTimestamp()
			.setFooter({
				text: `${config.companyName} | Any issues with the bot please contact ${config.adminUser}`,
			});

		return embed;
	}
}

module.exports = EmbedHelper;

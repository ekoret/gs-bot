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

	static getTimedOutEmbed(user) {
		const embed = new EmbedBuilder()
			.setColor('#046738')
			.setTitle(`${user.username}, you've already rolled this week!`)
			// .setDescription('You can roll again in `99d 10h 59m 23s`')
			.addFields(
				{
					name: 'Time Left',
					value: this.getTimeoutLength(user.weekly),
				},
				{
					name: 'Your Total Credits',
					value: `\`${user.totalCredits.toString()}\``,
				}
			)
			.setTimestamp()
			.setFooter({
				text: `${config.companyName} | Any issues with the bot please contact ${config.adminUser}`,
			});
		return embed;
	}

	static getTimeoutLength(weekly) {
		const now = Date.now();

		const timeLeft = ms(config.timeout - (now - weekly));
		console.log([
			timeLeft.days,
			timeLeft.hours,
			timeLeft.minutes,
			timeLeft.seconds,
		]);
	}
}

module.exports = EmbedHelper;

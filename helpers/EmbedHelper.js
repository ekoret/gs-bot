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

	static getUserRolledEmbed(user, reward) {
		const embed = new EmbedBuilder()
			.setColor('#046738')
			.setTitle(`${user.username}, you received $${reward} of credits!`)
			.setDescription(
				`Congratulations! You got a \`$${reward} credit\`!\n\nIf you'd like to redeem your points, contact an admin or customer service and \`provide your email address\` associated with your ${config.companyName} account.\n\n\`A minimum of $25 credits is required for redemption.\`
				`
			)
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

		const timeLeft = config.timeout - (now - weekly);

		let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
		let seconds = Math.floor((timeLeft / 1000) % 60);
		let minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
		let hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);

		days = days < 10 ? '0' + days : days;
		hours = hours < 10 ? '0' + hours : hours;
		minutes = minutes < 10 ? '0' + minutes : minutes;
		seconds = seconds < 10 ? '0' + seconds : seconds;

		return `\`${days}d ${hours}h ${minutes}m ${seconds}s\``;
	}
}

module.exports = EmbedHelper;

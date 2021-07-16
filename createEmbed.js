const Discord = require('discord.js');

const createEmbed = (title, description) => {
    const embed = new Discord.MessageEmbed()
	.setColor('#046738')
	.setTitle(title)
	.setDescription(description)
	.setTimestamp()
	.setFooter(`${process.env.SITE_NAME} | Any issues with the bot please contact ${process.env.ADMIN_USER}`);

    return embed;
}

module.exports = createEmbed;
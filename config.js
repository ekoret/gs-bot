require('dotenv').config();

const config = {
	token: process.env.BOT_TOKEN,
	client: process.env.BOT_CLIENT_ID,
	companyName: process.env.COMPANY_NAME,
	guildId: process.env.GUILD_ID,
	adminUser: process.env.ADMIN_USER,
	customerSupportUser: process.env.CUSTOMER_SUPPORT_USER,
};

module.exports = config;

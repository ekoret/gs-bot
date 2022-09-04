require('dotenv').config();

const devMode = true;

const config = {
	token: devMode ? process.env.BOT_TOKEN : process.env.BOT_TOKEN_PROD,
	client: devMode ? process.env.BOT_CLIENT_ID : process.env.BOT_CLIENT_ID_PROD,
	companyName: process.env.COMPANY_NAME,
	guildId: devMode ? process.env.GUILD_ID : process.env.GUILD_ID_PROD,
	adminUser: process.env.ADMIN_USER,
	customerSupportUser: process.env.CUSTOMER_SUPPORT_USER,
	mongodbSrv: process.env.MONGO_SRV,
	timeout: devMode ? 30000 : 604800000,
	botChannel: devMode
		? process.env.BOT_COMMANDS_CHANNEL
		: process.env.BOT_COMMANDS_CHANNEL_PROD,
	adminChannel: devMode
		? process.env.ADMIN_COMMANDS_CHANNEL
		: process.env.ADMIN_COMMANDS_CHANNEL_PROD,
};

module.exports = config;

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
	timeout: 604800000,
};

module.exports = config;

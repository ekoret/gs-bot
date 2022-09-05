import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

const devMode = true;

const config = {
	token: devMode ? process.env.BOT_TOKEN : process.env.BOT_TOKEN_PROD,
	client: devMode ? process.env.BOT_CLIENT_ID : process.env.BOT_CLIENT_ID_PROD,
	companyName: process.env.COMPANY_NAME,
	guildId: devMode ? process.env.GUILD_ID : process.env.GUILD_ID_PROD,
	adminUser: process.env.ADMIN_USER,
	customerSupportUser: process.env.CUSTOMER_SUPPORT_USER,
	mongodbSrv: process.env.MONGO_SRV,
	timeout: devMode ? 60000 : 604800000,
	botChannel: devMode
		? process.env.BOT_COMMANDS_CHANNEL
		: process.env.BOT_COMMANDS_CHANNEL_PROD,
	adminChannel: devMode
		? process.env.ADMIN_COMMANDS_CHANNEL
		: process.env.ADMIN_COMMANDS_CHANNEL_PROD,
};

export const wcConfig = {
	url: devMode ? process.env.SITE_URL_DEV : process.env.SITE_URL_PROD,
	consumerKey: devMode ? process.env.CK_DEV : process.env.CK_PROD,
	consumerSecret: devMode ? process.env.CS_DEV : process.env.CS_PROD,
	version: devMode ? process.env.VERSION_DEV : process.env.VERSION_PROD,
};

export default config;

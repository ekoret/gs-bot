require('dotenv').config();

const config = {
	token: process.env.BOT_TOKEN,
	client: process.env.BOT_CLIENT,
	companyName: process.env.COMPANY_NAME,
};

module.exports = config;

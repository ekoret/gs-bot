const mongoose = require('mongoose');
const config = require('./config');

async function connectDb() {
	try {
		await mongoose.connect(config.mongodbSrv);
		console.log('Connected to db');
	} catch (error) {
		console.log(error);
	}
}

module.exports = connectDb;

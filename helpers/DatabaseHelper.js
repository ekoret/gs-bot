const mongoose = require('mongoose');
const config = require('../config');

class DatabaseHelper {
	static connectDb() {
		try {
			mongoose.connect(config.mongodbSrv);
			console.log('Connected to db');
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports = { DatabaseHelper, mongoose };

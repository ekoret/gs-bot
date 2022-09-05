import mongoose from 'mongoose';
import { config } from './Discord.js';

export default class Database {
	static connectDb() {
		try {
			mongoose.connect(config.mongodbSrv);
			console.log('Connected to db');
		} catch (error) {
			console.log(error);
		}
	}
}

export { mongoose };

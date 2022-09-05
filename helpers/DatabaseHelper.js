import mongoose from 'mongoose';
import { config } from './DiscordHelper.js';

export default class DatabaseHelper {
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

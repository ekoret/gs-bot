import UserModel from '../models/user.js';
import { config } from '../helpers/Discord.js';

export default class User {
	constructor(id, username) {
		this._id = id;
		this.username = username;
		this.weekly = Date.now();
		this.totalCredits = this.#getRandomReward();

		this.#createUser(this._id, this.username, this.weekly, this.totalCredits);
	}

	#createUser(id, username, weekly, totalCredits) {
		const newUser = new UserModel({
			_id: id,
			username,
			weekly,
			totalCredits,
		});

		newUser.save((err) => {
			if (err) {
				console.log('Error saving user', err);
				return;
			}
			console.log('New user saved!', { newUser });
		});
		return { newUser, reward: totalCredits };
	}

	static async findUserById(id) {
		const user = await UserModel.findById(id);

		return user;
	}

	static canUserRoll = (userWeekly) => {
		const now = Date.now();

		if (config.timeout - (now - userWeekly) > 0) {
			return false;
		}

		return true;
	};

	#getRandomReward() {
		const rewards = [
			25, 15, 15, 15, 10, 10, 10, 10, 10, 5, 5, 5, 5, 5, 5, 5, 5,
		];
		const randomNumber = Math.floor(Math.random() * rewards.length);
		const reward = rewards[randomNumber];
		return reward;
	}
}

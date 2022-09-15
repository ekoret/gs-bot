import UserModel from '../models/user.js';
import { config } from '../helpers/Discord.js';

export default class User {
	constructor(id, username) {
		this._id = id;
		this.username = username;
		this.weekly = Date.now();
		this.totalCredits = this.constructor.getRandomReward();

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

	static async rewardUser(user) {
		const reward = this.getRandomReward();
		const now = Date.now();

		const updatedUser = await UserModel.findOneAndUpdate(
			{ _id: user._id },
			{ totalCredits: user.totalCredits + reward, weekly: now },
			{ new: true }
		);

		return { updatedUser, reward };
	}

	static async handleCredits({ user, method, amount }) {
		const foundUser = await this.findUserById(user.id);
		if (foundUser !== null) {
			let newTotal;
			const previousTotalCredits = foundUser.totalCredits;

			if (method === 'add') {
				newTotal = parseInt(foundUser.totalCredits) + parseInt(amount);
			} else if (method === 'minus') {
				newTotal = parseInt(foundUser.totalCredits) - parseInt(amount);
			} else if (method === 'set') {
				newTotal = parseInt(amount);
			}

			const updatedUser = await UserModel.findOneAndUpdate(
				{ _id: user.id },
				{ totalCredits: newTotal },
				{ new: true }
			);

			return { updatedUser, previousTotalCredits };
		} else {
			return null;
		}
	}

	static getRandomReward() {
		const rewards = [
			25, 15, 15, 15, 10, 10, 10, 10, 10, 5, 5, 5, 5, 5, 5, 5, 5,
		];
		const randomNumber = Math.floor(Math.random() * rewards.length);
		const reward = rewards[randomNumber];
		return reward;
	}
}

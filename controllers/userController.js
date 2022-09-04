const config = require('../config');
const User = require('../models/user');

const createUser = async (messageAuthorId, messageAuthorUsername) => {
	const reward = getRandomReward();

	const newUser = new User({
		_id: messageAuthorId,
		username: messageAuthorUsername,
		weekly: Date.now(),
		totalCredits: reward,
	});

	newUser.save((err) => {
		if (err) {
			console.log('Error saving user', err);
			return;
		}
		console.log('New user saved!', { newUser });
	});

	return { newUser, reward };
};

const findUserById = async (id) => {
	const user = await User.findById(id);

	return user;
};

const rewardUser = async (user) => {
	const reward = getRandomReward();
	const now = Date.now();

	const updatedUser = await User.findOneAndUpdate(
		{ _id: user._id },
		{ totalCredits: user.totalCredits + reward, weekly: now },
		{ new: true }
	);

	return { updatedUser, reward };
};

const getRandomReward = () => {
	const rewards = [25, 15, 15, 15, 10, 10, 10, 10, 10, 5, 5, 5, 5, 5, 5, 5, 5];
	const randomNumber = Math.floor(Math.random() * rewards.length);
	const reward = rewards[randomNumber];
	return reward;
};

const userCanRoll = (userWeekly) => {
	const now = Date.now();

	if (config.timeout - (now - userWeekly) > 0) {
		return false;
	}

	return true;
};

const handleCredits = async (user, method, amount) => {
	const foundUser = await findUserById(user.id);
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

		const updatedUser = await User.findOneAndUpdate(
			{ _id: user.id },
			{ totalCredits: newTotal },
			{ new: true }
		);

		return { updatedUser, previousTotalCredits };
	} else {
		return null;
	}
};

module.exports = {
	createUser,
	findUserById,
	rewardUser,
	userCanRoll,
	handleCredits,
};

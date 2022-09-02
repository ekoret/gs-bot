const User = require('../models/user');

const createUser = async (messageAuthorId, messageAuthorUsername, reward) => {
	const newUser = new User({
		_id: messageAuthorId,
		username: messageAuthorUsername,
		weekly: Date.now(),
		totalCredits: reward,
	});

	await newUser
		.save()
		.then((res) => {
			console.log(
				`User ${messageAuthorId}, ${messageAuthorUsername} has been added to the weekly lottery!`
			);
		})
		.catch((err) => console.log('Error has occured creating user =>', err));
};

const findUser = async (id) => {
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

const userCanRoll = (user) => {
	const timeout = 604800000;
	const now = Date.now();

	if (timeout - (now - user.weekly) > 0) {
		return false;
	}

	return true;
};

module.exports = { createUser, findUser, rewardUser, userCanRoll };

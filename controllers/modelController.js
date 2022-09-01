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

module.exports = createUser;

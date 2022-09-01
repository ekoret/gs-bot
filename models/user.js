const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		_id: {
			type: String,
			required: true,
		},
		username: String,
		weekly: Number,
		totalCredits: Number,
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model('User', userSchema);

module.exports = User;

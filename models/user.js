import { mongoose } from '../helpers/Database.js';

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

export default User;

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	id: {
		type: String,
		unique: true
	},
	name: {
		type: String
	},
	is_admin: {
		type: Boolean,
		default: false
	},
	email: {
		type: String,
		unique: true
	},
	year: {
		type: Number
	},
	branch: {
		type: String
	},
	password: {
		type: String
	},
	token: {
		type: String
	},
});

module.exports = mongoose.model("users", userSchema);
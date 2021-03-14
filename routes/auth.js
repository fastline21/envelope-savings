const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Models
const User = require("./../models/User");

// Middleware
const auth = require("./../middleware/auth");

// Login user
router.post("/", async (req, res) => {
	const { email, password } = req.body;
	if (
		email === undefined ||
		email === null ||
		email === "" ||
		password === undefined ||
		password === null ||
		password === ""
	) {
		return res
			.status(404)
			.json({ msg: "Please fill in all the required fields." });
	}
	try {
		let user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ msg: "User not found." });
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ msg: "Invalid Credentials" });
		}
		const payload = {
			user: {
				id: user.id,
			},
		};
		jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
			if (err) throw err;
			return res.json({ token });
		});
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server Error");
	}
});

// Logged user
router.get("/", auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select(
			"-password -date -username"
		);
		res.json(user);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server Error");
	}
});

module.exports = router;

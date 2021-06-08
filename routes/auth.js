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
	if (!email || !password) {
		return res
			.status(404)
			.json({ message: "Please fill in all the required fields." });
	}
	try {
		let user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ message: "User not found." });
		}

		if (!user.isVerify) {
			return res
				.status(400)
				.json({
					message: 'Please verify your account by clicking the link in your email.'
				})
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ message: "Invalid Credentials" });
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

// Verify user
router.put("/verify/:token", async (req, res) => {
	const { token } = req.params;
	let user = await User.findOne({
		verificationToken: token,
		isVerify: false,
	});

	if (!user) {
		return res.status(404).json({ message: "No user found." });
	}

	try {
		user.verificationToken = "";
		user.isVerify = true;
		await user.save();

		res.json({
			message: 'You have now successfully verified your account. Please login to your account to start saving money.'
		});
	} catch (error) {
		cconsole.error('error:', error);
		res.status(error.responseCode).json({ message: error.response });
	}
});

module.exports = router;

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const randomstring = require('randomstring');

// Models
const User = require('./../models/User');

// Config
const { sendEmail } = require('./../config/mailer');

// Register user
router.post('/', async (req, res) => {
	const { fullname, email, password, password2 } = req.body;
	const baseUrl = process.env.BASE_URL || `http://localhost:${process.env.CLIENT_PORT}`
	if (!fullname || !email || !password || !password2) {
		return res
			.status(404)
			.json({
				message: 'Please fill in all the required fields.'
			});
	} else if (password !== password2) {
		return res.status(400).json({ message: 'Password not match.' });
	}

	try {
		let user = await User.findOne({ email });
		if (user) {
			return res.status(400).json({ message: 'User already registered.' });
		}
		const salt = await bcrypt.genSalt(10);
		const newPassword = await bcrypt.hash(String(password), salt);
		const verificationToken = randomstring.generate();
		const newUser = new User({
			fullname,
			email,
			password: newPassword,
			verificationToken,
		});
		const compose = `
		Thank you for register in Envelope Savings.
		<br /><br />
		Please verify your email by clicking the link below.
		<br />
		<a href="${baseUrl}/verify/${verificationToken}" target="_blank">Verify Account</a>
		<br /><br />
		If you cannot click on the link, copy and paste this link in your browser.
		<br />
		<a href="${baseUrl}/verify/${verificationToken}" target="_blank">${baseUrl}/verify/${verificationToken}</a>
		<br />
		Thank you
		<br />
		Envelope Savings Dev
		`;
		try {
			await sendEmail(
				`Envelope Savings <${process.env.MAILER_USER}>`,
				email,
				'Register',
				compose
			);
			await newUser.save();
			res.json({ message: 'Kindly check your email to activate your account.' });
		} catch (error) {
			console.error('error:', error);
			res.status(error.responseCode).json({ message: error.response });
		}
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;

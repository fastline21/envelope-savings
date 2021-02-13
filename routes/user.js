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
	if (
		fullname === undefined ||
		fullname === null ||
		fullname === '' ||
		email === undefined ||
		email === null ||
		email === '' ||
		password === undefined ||
		password === null ||
		password === '' ||
		password2 === undefined ||
		password2 === null ||
		password2 === ''
	) {
		return res
			.status(404)
			.json({ msg: 'Please fill in all the required fields.' });
	} else if (password !== password2) {
		return res.status(400).json({ msg: 'Password not match.' });
	}

	try {
		let user = await User.findOne({ email });
		if (user) {
			return res.status(400).json({ msg: 'User already registered.' });
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
		Thank you for register in Envelope Savings App.
		<br /><br />
		Click the below link to verify your account.
		<br />
		Verify Link: <a href="http://localhost:3000/verify/${verificationToken}" target="_blank">Verify Account</a>
		<br /><br />
		Thank you
		<br />
		Envelope Savings Dev
		`;
		try {
			await newUser.save();
			await sendEmail(
				`Envelope Savings <${process.env.MAILER_USER}>`,
				email,
				'Register',
				compose
			);
			res.json({ msg: 'Register user success.' });
		} catch (error) {
			console.error('error:', error);
			res.status(error.responseCode).json({ msg: error.response });
		}
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;

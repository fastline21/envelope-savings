const express = require("express");
const router = express.Router();
const moment = require('moment');

// Middleware
const auth = require("./../middleware/auth");

// Models
const Envelope = require("./../models/Envelope");

// Utils
const getRandom = require("./../utils/getRandom");

// Get all envelopes
router.get("/", auth, async (req, res) => {
	try {
		const envelope = await Envelope.find({ user: req.user.id });
		res.json(envelope);
	} catch (error) {
		console.error(error.message);
		res.status(error.responseCode).json({ message: error.response });
	}
});

// Get envelope
router.get("/:id", auth, async (req, res) => {
	const { id } = req.params;
	try {
		const envelope = await Envelope.findById(id);
		res.json(envelope);
	} catch (error) {
		console.error('error:', error);
		res.status(error.responseCode).json({ message: error.response });
	}
});

// Create envelope
router.post("/", auth, async (req, res) => {
	const { purpose, deposit, amount } = req.body;
	if (!purpose || !deposit || !amount) {
		return res
			.status(404)
			.json({ message: "Please fill in all the required fields." });
	}
	let goalMoney = 0;
	for (let i = 0; i <= amount; i++) {
		goalMoney += i;
	}
	try {
		const newEnvelope = new Envelope({
			user: req.user.id,
			purpose,
			deposit,
			amount,
			goalMoney,
		});
		const envelope = await newEnvelope.save();
		res.json(envelope);
	} catch (error) {
		console.error('error:', error);
		res.status(error.responseCode).json({ message: error.response });
	}
});

// Update envelope
router.put("/:id", auth, async (req, res) => {
	const { id } = req.params;
	const { purpose, amount, deposit } = req.body;

	if (!purpose || !amount || !deposit) {
		return res.status(404).json({ message: "Please fill in all the required fields." });
	}

	try {
		let envelope = await Envelope.findById(id);
		const getStatus = envelope.status;

		if (getStatus !== 'Pending') {
			return res.status(403).json({ message: 'Nothing' });
		}

		let goalMoney = 0;
		for (let i = 0; i <= amount; i++) {
			goalMoney += i;
		}

		await envelope.updateOne({
			purpose,
			deposit,
			amount,
			goalMoney,
		});

		envelope = await Envelope.find({ user: req.user.id });
		res.json(envelope);
	} catch (error) {
		console.error(error.message);
		res.status(error.responseCode).json({ message: error.response });
	}
});

// Roll money
router.patch("/:id", auth, async (req, res) => {
	const { id } = req.params;
	try {
		let envelope = await Envelope.findById(id);
		let getStatus = envelope.status;
		let random = 0;
		let isFound = true;
		let dateStarted = dateFinished = '';
		do {
			random = getRandom(envelope["amount"]);
			isFound = envelope["envelopes"].some((envelope) => envelope.money === random)
				? true
				: false;
		} while (isFound);
		try {
			const { dateStarted, amount } = envelope;
			console.log(moment(dateStarted).add(amount - 1));
			// const totalEnvelope = envelope["envelopes"].length + 1;
			// const totalMoney = envelope["envelopes"].length >= 1 ? envelope["envelopes"].map(envelope => envelope.money).reduce((prev, next) => prev + next) + random : random;

			// if (getStatus === 'Pending') {
			// 	getStatus = 'Ongoing'
			// 	dateStarted = new Date();
			// } else if (getStatus === 'Ongoing' && totalEnvelope === envelope.amount) {
			// 	getStatus = 'Complete';
			// 	dateFinished = new Date();
			// }

			// await envelope.updateOne({
			// 	envelopes: [
			// 		...envelope["envelopes"],
			// 		{
			// 			money: random,
			// 			date: new Date(),
			// 		},
			// 	],
			// 	latestEnvelope: { money: random, date: new Date() },
			// 	totalEnvelope,
			// 	totalMoney,
			// 	dateStarted,
			// 	dateFinished,
			// 	estimatedDateFinish: 0,
			// 	status: getStatus
			// });
			// envelope = await Envelope.findById(id);
			// res.json({ envelope, random });
		} catch (error) {
			console.error(error.message);
			res.status(error.responseCode).json({ message: error.response });
		}
	} catch (error) {
		console.error(error.message);
		res.status(error.responseCode).json({ message: error.response });
	}
});

// Delete envelope
router.delete("/:id", auth, async (req, res) => {
	const { id } = req.params;

	try {
		let envelope = await Envelope.findById(id);
		if (!envelope) {
			return res.status(404).json({ message: "Envelope not found." });
		}

		await envelope.remove({ _id: id })
		envelope = await Envelope.find({ user: req.user.id });
		res.json({ envelopes } = envelope);
		// await Envelope.findByIdAndDelete(id);
		// res.json({ message: "Your envelope is successfully delete." });
	} catch (error) {
		console.error(error.message);
		res.status(error.responseCode).json({ message: error.response });
	}
});

module.exports = router;

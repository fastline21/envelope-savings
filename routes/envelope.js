const express = require("express");
const router = express.Router();

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
		res.status(500).send("Server Error");
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

// Roll money
router.put("/:id", auth, async (req, res) => {
	const { id } = req.params;
	try {
		let envelope = await Envelope.findById(id);
		let random = 0;
		let isFound = true;
		do {
			random = getRandom(envelope["amount"]);
			isFound = envelope["envelopes"].some((env) => env.money === random)
				? true
				: false;
		} while (isFound);
		try {
			const totalEnvelope = envelope["envelopes"].length + 1;
			const totalMoney = envelope["envelopes"].length >= 1 ? envelope["envelopes"].map(envelope => envelope.money).reduce((prev, next) => prev + next) + random : random;
			await envelope.updateOne({
				envelopes: [
					...envelope["envelopes"],
					{
						money: random,
						date: new Date(),
					},
				],
				latestEnvelope: { money: random, date: new Date() },
				totalEnvelope,
				totalMoney
			});
			envelope = await Envelope.findById(id);
			res.json({ envelope, random });
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
		const envelope = await Envelope.findById(id);
		if (!envelope) {
			return res.status(404).json({ message: "Envelope not found." });
		}
		await Envelope.findByIdAndDelete(id);
		res.json({ message: "Your envelope is successfully delete." });
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server Error");
	}
});

module.exports = router;

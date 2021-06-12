const mongoose = require('mongoose');

const EnvelopeSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users',
	},
	envelopes: {
		type: Array,
		money: {
			type: Number,
			required: true,
		},
		date: {
			type: Date,
		},
	},
	latestEnvelope: {
		type: Object,
		money: {
			type: Number,
		},
		date: {
			type: Date,
		},
	},
	purpose: {
		type: String,
		required: true,
	},
	deposit: {
		type: String,
		required: true,
	},
	amount: {
		type: Number,
		required: true,
	},
	goalMoney: {
		type: Number,
		required: true,
	},
	dateCreated: {
		type: Date,
		default: Date.now,
	},
	dateStarted: {
		type: Date,
	},
	dateFinished: {
		type: Date,
	},
	scheduledFinishDate: {
		type: Date,
	},
	totalMoney: {
		type: Number,
		default: 0,
	},
	totalEnvelope: {
		type: Number,
		default: 0,
	},
	status: {
		type: String,
		default: 'Pending',
	},
});

module.exports = mongoose.model('Envelope', EnvelopeSchema);

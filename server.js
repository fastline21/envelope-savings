const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const db = require('./config/db');
const session = require('express-session');

// Load env file
require('dotenv').config();

// Init app
const app = express();

// Init database
db();

// Init helmet
app.use(helmet());

// Init cors
app.use(cors());

// Middleware
app.use(express.json({ extended: true }));

// Express session
app.use(
	session({
		secret: 'secret',
		resave: true,
		saveUninitialized: true,
	})
);

// API route
app.use('/api', require('./routes/index'));

// Port
const port = process.env.PORT || 5000;

// App run
app.listen(port, () =>
	console.log(`Server running on http://localhost:${port}`)
);

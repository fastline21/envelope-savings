const express = require('express');
const db = require('./config/db');
const session = require('express-session');
const path = require('path');

// Init app
const app = express();

// Init database
db();

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
app.use('/api', require('./routes'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
	// Set static folder
	app.use(express.static('client/build'));

	app.get('*', (req, res) =>
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	);
}

// Port
const port = process.env.PORT || 5000;

// App run
app.listen(port, () =>
	console.log(`Server running on http://localhost:${port}`)
);

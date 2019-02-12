// Requires
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const app = express();

// View Engine
app.set('view engine', 'ejs');

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));

app.use(
	methodOverride((req, res) => {
		if (req.body && req.body._method) {
			const method = req.body._method;
			// This modifies the request object
			// it changes it from a POST request
			// to be whatever the value for _method was
			// within the form that was just submitted
			return method;
		}
	}),
);

app.use(cookieParser());

app.use((request, response, next) => {
	const username = request.cookies.username;
	response.locals.username = username || '';
	next();
});

// Routers
// const clucksRouter = require('./routes/clucksRouter');
// app.use('/clucks', clucksRouter);

const baseRouter = require('./routes/baseRouter');
app.use('/', baseRouter);

// Server Setup

const PORT = 4343;
const HOST = 'localhost'
app.listen(PORT, HOST, () => {
  console.log(`Server UP and listening at http://${HOST}:${PORT}`);
});

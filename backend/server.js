require('dotenv').config();
const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const isProduction = process.env.NODE_ENV === 'production';

const app = express();

if (!isProduction) {
	// app.use(cors());
	app.use(
		cors({
			credentials: true,
			origin: 'http://localhost:3000'
		})
	);
}

app.use(routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server running on port ' + PORT));

const express        = require('express');
const app            = express();
const routes		 = require('./app/routes');

const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./config/db');

const env = {
	port: 8000
};

app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(db.url, (err, database) => {
	if (err) return console.log(err);

	const piiDb = database.db('pii-hackathon');
	routes(app, piiDb);

	app.listen(env.port, () => {
		console.log('Listening on port ' + env.port);
	});
});
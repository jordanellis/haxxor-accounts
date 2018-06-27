const noteRoutes = require('./note_routes');
const accountRoutes = require('./account_routes');

module.exports = function(app, db) {
	noteRoutes(app, db);
	accountRoutes(app, db);

	app.get('/', (req, res) => {
		console.log('GET /');
		res.send('PII Librarian');
	});
};
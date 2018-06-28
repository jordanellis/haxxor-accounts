var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
	const errMsgObj = { 'error': 'An error occurred' };

	app.get('/notes/:id', (req, res) => {
		console.log('GET /notes/:id');

		const id = req.params.id;
    	const details = { '_id': new ObjectID(id) };

    	db.collection('notes').findOne(details, (err, item) => {
	    	if (err) {
				res.send(errMsgObj);
				throw err;
			} else {
				res.send(item);
			}
    	});
 	});

	app.post('/notes', (req, res) => {
		console.log('POST /notes');

    	const note = {
    		text: req.body.body,
    		title: req.body.title
    	};

		db.collection('notes').insert(note, (err, results) => {
			if (err) {
				res.send(errMsgObj);
				throw err;
			} else {
				res.send(results.ops[0]);
			}
		});
	});

	app.put('/notes/:id', (req, res) => {
		console.log('GET /notes/:id');

    	const id = req.params.id;
    	const details = { '_id': new ObjectID(id) };
    	const note = {
    		text: req.body.body,
    		title: req.body.title
    	};

    	db.collection('notes').update(details, note, (err, result) => {
	      	if (err) {
				res.send(errMsgObj);
				throw err;
			} else {
	      		res.send(note);
	      	}
    	});
  	});

	app.delete('/notes/:id', (req, res) => {
		console.log('DELETE /notes/:id');

    	const id = req.params.id;
    	const details = { '_id': new ObjectID(id) };

    	db.collection('notes').remove(details, (err, item) => {
      		if (err) {
				res.send(errMsgObj);
				throw err;
			} else {
      			res.send('Note ' + id + ' deleted!');
      		}
    	});
	});

};


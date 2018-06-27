var ObjectID = require('mongodb').ObjectID;
const errMsgObj = { 'error': 'An error has occurred' };

module.exports = function(app, db) {
	app.get('/notes/:id', (req, res) => {
		const id = req.params.id;
		console.log('GET /notes/' + id);

    	const details = { '_id': new ObjectID(id) };
    	db.collection('notes').findOne(details, (err, item) => {
	    	err && res.send(errMsgObj) || res.send(item);
    	});
 	});

	app.post('/notes', (req, res) => {
    	console.log('POST /notes');

    	const note = { text: req.body.body, title: req.body.title};
		db.collection('notes').insert(note, (err, results) => {
			err && res.send(errMsgObj) || res.send(results.ops[0]);
		});
	});

	app.put('/notes/:id', (req, res) => {
    	const id = req.params.id;
    	console.log('GET /notes/' + id);

    	const details = { '_id': new ObjectID(id) };
    	const note = { text: req.body.body, title: req.body.title };
    	db.collection('notes').update(details, note, (err, result) => {
	      	err && res.send(errMsgObj) || res.send(note);
    	});
  	});

	app.delete('/notes/:id', (req, res) => {
    	const id = req.params.id;
    	console.log('DELETE /notes/' + id);

    	const details = { '_id': new ObjectID(id) };
    	db.collection('notes').remove(details, (err, item) => {
      		err && res.send(errMsgObj) || res.send('Note ' + id + ' deleted!');
    	});
	});
};


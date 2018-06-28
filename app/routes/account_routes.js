module.exports = function(app, db) {
	const errMsgObj = { 'error': 'An error has occurred' };

    app.get('/accounts', (req, res) => {
		console.log('GET /accounts');

        db.collection('accounts').find({}, { _id: 0 }).toArray((err, results) => {
            if (err) throw err;
            res.send(results);
        });
    });

	app.get('/account/:accountNumber', (req, res) => {
		console.log('/account/:accountNumber');

    	const accountNumber = req.params && req.params.accountNumber;

    	db.collection('accounts').find({accountNumber: accountNumber}, { _id: 0 }).toArray((err, results) => {
			if (err) {
				res.send(errMsgObj);
				throw err;
			} else {
            	res.send(results);
        	}
        });
 	});

	app.post('/account', (req, res) => {
		console.log('POST /account/');

    	const account = {
            accountNumber: req && req.body.accountNumber,
            name: req && req.body.name,
            address: req && req.body.address,
            phoneNumber: req && req.body.phoneNumber,
            balance: req && req.body.balance
        };

		db.collection('accounts').insert(account, (err, results) => {
			if (err) {
				res.send(errMsgObj);
				throw err;
			} else {
				res.send(results.ops[0])
			}
		});
	});

	app.put('/account/:accountNumber', (req, res) => {
		console.log('PUT /account/:accountNumber');

    	const accountNumber = req.params && req.params.accountNumber;
    	const details = { 'accountNumber': accountNumber };

    	const account = {
            accountNumber: accountNumber,
            name: req && req.body.name,
            address: req && req.body.address,
            phoneNumber: req && req.body.phoneNumber,
            balance: req && req.body.balance
        };

    	db.collection('accounts').update(details, account, (err, result) => {
	      	if (err) {
				res.send(errMsgObj);
				throw err;
			} else {
	      		res.send(account);
	      	}
    	});
  	});

	app.delete('/account/:accountNumber', (req, res) => {
		console.log('DELETE /account/:accountNumber');

    	const accountNumber = req.params && req.params.accountNumber;
    	const details = { 'accountNumber': accountNumber };

    	db.collection('accounts').remove(details, (err, item) => {
    		if (err) {
				res.send(errMsgObj);
				throw err;
			} else {
    			res.send('Account ' + accountNumber + ' deleted!');
    		}
    	});
	});
};
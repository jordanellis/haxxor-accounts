module.exports = function(app, db) {
	const errMsgObj = { 'error': 'An error has occurred' };

    app.get('/accounts', (req, res) => {
    	console.log('GET /accounts');
        const id = req.params.id;

        db.collection('accounts').find({}, { _id: 0 }).toArray(function(err, results) {
            if (err) throw err;
            res.send(results);
        });
    });

	app.get('/account/:accountNumber', (req, res) => {
    	const accountNumber = req.params.accountNumber;
        console.log('GET /account/' + accountNumber);

    	db.collection("accounts").find({accountNumber: accountNumber}, { _id: 0 }).toArray(function(err, results) {
            if (err) throw err;
            res.send(results);
        });
 	});

	app.post('/account', (req, res) => {
    	console.log('POST /account/');
    	const account = { 
            accountNumber: req.body && req.body.accountNumber, 
            name: req.body && req.body.name,
            address: req.body && req.body.address,
            phoneNumber: req.body && req.body.phoneNumber, 
            balance: req.body && req.body.balance
        };

		db.collection('accounts').insert(account, (err, results) => {
			err && res.send(errMsgObj) || res.send(results.ops[0]);
		});
	});

	app.put('/account/:accountNumber', (req, res) => {
    	const accountNumber = req.params.accountNumber;
    	console.log('PUT /account/' + accountNumber);

    	const details = { 'accountNumber': accountNumber };
    	const account = {
            accountNumber: req.body && req.body.accountNumber,
            name: req.body && req.body.name,
            address: req.body && req.body.address,
            phoneNumber: req.body && req.body.phoneNumber,
            balance: req.body && req.body.balance
        };
    	db.collection('accounts').update(details, account, (err, result) => {
	      	err && res.send(errMsgObj) || res.send(account);
    	});
  	});

	app.delete('/account/:accountNumber', (req, res) => {
    	const accountNumber = req.params.accountNumber;
    	console.log('DELETE /account/' + accountNumber);

    	const details = { 'accountNumber': accountNumber };
    	db.collection('accounts').remove(details, (err, item) => {
    		err && res.send(errMsgObj) || res.send('Account ' + accountNumber + ' deleted!');
    	});
	});
};
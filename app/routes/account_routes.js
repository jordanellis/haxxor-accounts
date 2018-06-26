module.exports = function(app, db) {
    app.get('/accounts', (req, res) => {
        const id = req.params.id;
        db.collection('accounts').find({}, { _id: 0 }).toArray(function(err, results) {
            if (err) throw err;
            res.send(results)
        });
    });

	app.get('/account/:accountNumber', (req, res) => {
    	const accountNumber = req.params.accountNumber;
        console.log('attempting to get ' + accountNumber);
    	db.collection("accounts").find({accountNumber: accountNumber}, { _id:0 }).toArray(function(err, results) {
            if (err) throw err;
            res.send(results)
        });
 	});

	app.post('/account', (req, res) => {
    	console.log(req.body);
    	const account = { 
            accountNumber: req.body.accountNumber, 
            name: req.body.name,
            address: req.body.address,
            phoneNumber: req.body.phoneNumber, 
            balance: req.body.balance 
        };
		db.collection('accounts').insert(account, (err, results) => {
			if (err) { 
		    	res.send({ 'error': 'An error has occurred' }); 
		    } else {
		        res.send(results.ops[0]);
		    }
		})
	});

	app.put('/account/:accountNumber', (req, res) => {
    	const accountNumber = req.params.accountNumber;
    	const details = { 'accountNumber': accountNumber };
    	const account = { 
            accountNumber: req.body.accountNumber, 
            name: req.body.name,
            address: req.body.address,
            phoneNumber: req.body.phoneNumber, 
            balance: req.body.balance 
        };
    	db.collection('accounts').update(details, account, (err, result) => {
	      	if (err) {
	          	res.send({'error':'An error has occurred'});
	      	} else {
	          	res.send(account);
	      	} 
    	});
  	});

	app.delete('/account/:accountNumber', (req, res) => {
    	const accountNumber = req.params.accountNumber;
    	const details = { 'accountNumber': accountNumber };
    	db.collection('accounts').remove(details, (err, item) => {
      		if (err) {
        		res.send({'error':'An error has occurred'});
      		} else {
        		res.send('Account ' + accountNumber + ' deleted!');
      		} 
    	});
	});
};
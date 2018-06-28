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
    	db.collection("accounts").find({accountNumber: accountNumber}, { _id:0 }).toArray(function(err, results) {
            if (err) throw err;
            res.send(results)
        });
 	});

	app.post('/account', (req, res) => {
        var account = {};
        for (key in req.body) {
            var data = JSON.parse(key);
            account.accountNumber = data.accountNumber;
            account.name = data.name;
            account.address = data.address;
            account.phoneNumber = data.phoneNumber;
            account.balance = data.balance;
        }
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
        var account = {};
        for (key in req.body) {
            var data = JSON.parse(key);
            account.accountNumber = data.accountNumber;
            account.name = data.name;
            account.address = data.address;
            account.phoneNumber = data.phoneNumber;
            account.balance = data.balance;
        }
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
    	db.collection('accounts').remove({accountNumber: accountNumber}, (err, item) => {
      		if (err) {
        		res.send({'error':'An error has occurred'});
      		} else {
        		res.send('Account ' + accountNumber + ' deleted!');
      		} 
    	});
	});
};
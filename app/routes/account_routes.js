module.exports = function(app, db) {
	const errMsgObj = { 'error': 'An error has occurred' };

    app.get('/accounts', (req, res) => {
		console.log('GET /accounts');

        db.collection('accounts').find({}, { _id: 0 }).toArray((err, results) => {
            if (err) throw err;
            maskForgottenAccounts(results).then(accounts => {
                console.log(accounts);
                res.send(accounts);
            });
        });
    });

	app.get('/account/:accountNumber', (req, res) => {
    	const accountNumber = req.params.accountNumber;
    	db.collection("accounts").find({accountNumber: accountNumber}, { _id:0 }).toArray(function(err, results) {
            if (err) throw err;
            maskForgottenAccounts(results).then(accounts => {
                res.send(accounts);
            });
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
				res.send(errMsgObj);
				throw err;
			} else {
	      		res.send(account);
	      	}
    	});
  	});

	app.delete('/account/:accountNumber', (req, res) => {
        const accountNumber = req.params.accountNumber;
        db.collection('forget_list').insert({ 'accountNumber': accountNumber }, (err, results) => {
            if (err) {
                res.send(errMsgObj);
                throw err;
            } else {
                res.send('Account ' + accountNumber + ' forgotten!')
            }
        });
	});

    var maskForgottenAccounts = function(accounts) {
        return new Promise((resolve, reject) => {
            let forgottenAccounts = [];

            db.collection('forget_list').find({}, { _id: 0 }).toArray((err, results) => {
                if (err) throw err;
                forgottenAccounts = results;
                for (var i = 0; i < accounts.length; i++) {
                    for (var j = 0; j < forgottenAccounts.length; j++) {
                        if (forgottenAccounts[j].accountNumber === accounts[i].accountNumber){
                            accounts[i].accountNumber = '**REDACTED**';
                            accounts[i].name = '**REDACTED**';
                            accounts[i].address = '**REDACTED**';
                            accounts[i].phoneNumber = '**REDACTED**';
                            accounts[i].balance = '**REDACTED**';
                        }
                    }
                }
                resolve(accounts);
            });
        }
    )};
};

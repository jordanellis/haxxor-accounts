const factory = require('../../ethereum/factory.js');
const web3 = require('../../ethereum/web3.js');
const errMsgObj = { 'error': 'An error has occurred' };

module.exports = function(app, db) {

    app.get('/accounts', (req, res) => {
		console.log('GET /accounts');

        db.collection('accounts').find({}, { _id: 0 }).toArray((err, results) => {
            if (err) throw err;
            res.send(results);
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
    	db.collection('accounts').remove({accountNumber: accountNumber}, (err, item) => {
      		if (err) {
        		res.send({'error':'An error has occurred'});
      		} else {
        		res.send('Account ' + accountNumber + ' deleted!');
      		} 
    	});
	});
};

recordTransaction = async () => {
    try {
        const accounts = await web3.eth.getAccounts();
        await factory.methods.createCampaign(this.state.minimumContribution)
            .send({
                from: accounts[0]
            });
    } catch (err) {
        console.log(errMsgObj)
    }
};
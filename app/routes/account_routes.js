import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
const errMsgObj = { 'error': 'An error has occurred' };

module.exports = function(app, db) {

    app.get('/accounts', (req, res) => {
		console.log('GET /accounts');

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET');

        db.collection('accounts').find({}, { _id: 0 }).toArray((err, results) => {
            if (err) throw err;
            maskForgottenAccounts(results).then(accounts => {
                res.send(accounts);
                recordTransaction(results.toString());
            });
        });
    });

	app.get('/account/:accountNumber', (req, res) => {
        console.log('GET /account/:accountNumber');

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET');

    	const accountNumber = req.params.accountNumber;
    	db.collection("accounts").find({accountNumber: accountNumber}, { _id:0 }).toArray(function(err, results) {
            if (err) throw err;
            maskForgottenAccounts(results).then(accounts => {
                res.send(accounts);
                recordTransaction(results.toString());
            });
        });
 	});

	app.get('/forget/:accountNumber', (req, res) => {
        console.log('FORGET /account/:accountNumber');

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET');

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

async function recordTransaction(jsonResponse) {
    try {
        const accounts = await web3.eth.getAccounts();
        await factory.methods.createCampaign(jsonResponse)
            .send({
                from: accounts[0],
                gas: 4712388
            });
        console.log('Transaction recorded from ' + accounts[0])
    } catch (err) {
        console.log(err);
    }
};

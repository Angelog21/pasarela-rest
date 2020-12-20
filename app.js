let express = require('express');
let logger = require('morgan');

let clientFunctions = require('./functions/client');
let walletFunctions = require('./functions/wallet');
let paymentFunctions = require('./functions/payment');

let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/',(req,res) => {
  return res.status(200).json({message:"hola!"})
})

app.post('/client', clientFunctions.createClient);

app.post('/wallet', walletFunctions.rechargeWallet);

app.post('/balance', walletFunctions.consultBalance);

app.post('/pay',paymentFunctions.pay);

app.post('/confirm-payment',paymentFunctions.confirmPayment);

module.exports = app;

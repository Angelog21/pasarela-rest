const soap = require('soap');

export let createClient = (req,res) => {
    let body = req.body;

    let url = 'http://localhost:8000/client?wsdl';
    soap.createClient(url, (err, client) => {
        console.log("client",client);
    });
}
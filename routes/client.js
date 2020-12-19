const express = require('express');
const router = express.Router();
const clientFunctions = require('../functions/client');

/* GET users listing. */
router.get('/client', clientFunctions.createClient);

module.exports = router;

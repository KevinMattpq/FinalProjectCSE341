const express = require('express');
const router = express.Router();
const agents = require('./agents');

// router.use('/', require('./swagger'));
router.use('/agents', agents);
// router.use('/appointments', require('./appointments'));
// router.use('/clubs', require('./clubs'));
// router.use('/players', require('./players'));

module.exports = router;
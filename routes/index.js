const express = require('express');
const router = express.Router();

// router.use('/', require('./swagger'));
router.use('/agents', require('./agents'));
router.use('/appointments', require('./appointments'));
router.use('/clubs', require('./clubs'));
router.use('/players', require('./players'));

module.exports = router;
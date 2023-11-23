const express = require('express');
const router = express.Router();

// router.use('/', require('./swagger'));
router.use('/agents', require('./agents'));
router.use('/appoiments', require('./appoiments'));
router.use('/clubs', require('./clubs'));
router.use('/players', require('./players'));

module.exports = router;
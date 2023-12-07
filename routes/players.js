const express = require('express');
const router = express.Router();
const playersController = require('../controllers/players');

// Importing validations
const validation = require('../middleware/validation');

router.get('/', playersController.getAll);
router.get('/:id', playersController.getSingle);
router.post('/',validation.savePlayer, playersController.createPlayers);
router.put('/:id',validation.savePlayer, playersController.updatePlayers);
router.delete('/:id',validation.savePlayer,playersController.deletePlayers);

module.exports = router;
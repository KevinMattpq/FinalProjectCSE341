const express = require('express');
const router = express.Router();
const clubsController = require('../controllers/clubs');

// Importing validations
const validation = require('../middleware/validation');

router.get('/', clubsController.getAll);
router.get('/:id', clubsController.getSingle);
router.post('/',validation.saveClub, clubsController.createClubs);
router.put('/:id',validation.saveClub, clubsController.updateClubs);
router.delete('/:id',validation.saveClub, clubsController.deleteClubs);

module.exports = router;
const express = require('express');
const router = express.Router();
const clubsController = require('../controllers/clubs');

router.get('/', clubsController.getAll);
router.get('/:id', clubsController.getSingle);
router.post('/', clubsController.createClubs);
router.put('/:id', clubsController.updateClubs);
router.delete('/:id', clubsController.deleteClubs);

module.exports = router;
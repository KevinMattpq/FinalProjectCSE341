const express = require('express');
const router = express.Router();
const agentController = require('../controllers/agent');

router.get('/', agentController.getAll);
router.get('/:id', agentController.getAgent);
//Testing
router.post('/', agentController.createAgent);

router.put('/:id', agentController.updateAgent);
router.delete('/:id', agentController.deleteAgent);

module.exports = router;
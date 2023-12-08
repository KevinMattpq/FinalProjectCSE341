const express = require('express');
const router = express.Router();
const agentController = require('../controllers/agent');

// Importing validations
const validation = require('../middleware/validation');

router.get('/', agentController.getAll);
router.get('/:id', agentController.getAgent);
//Testing
router.post('/',validation.saveAgent, agentController.createAgent);
router.put('/:id',validation.saveAgent, agentController.updateAgent);
router.delete('/:id', agentController.deleteAgent);

module.exports = router;
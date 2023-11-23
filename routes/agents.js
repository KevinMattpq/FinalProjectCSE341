const express = require('express');
const router = express.Router();
const agentController = require('../controllers/agent');

router.get('/', agentController.getAll);
router.get('/:username', agentController.getAgent);
router.post('/', agentController.create);
router.put('/:username', agentController.updateAgent);
router.delete('/:username', agentController.deleteAgent);

module.exports = router;
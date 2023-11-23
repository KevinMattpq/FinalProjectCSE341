const express = require('express');
const router = express.Router();
const appointmentsController = require('../controllers/appointments');

router.get('/', appointmentsController.getAll);
router.get('/:id', appointmentsController.getSingle);
router.post('/', appointmentsController.createAppointments);
router.put('/:id', appointmentsController.updateAppointments);
router.delete('/:id', appointmentsController.deleteAppointments);

module.exports = router;
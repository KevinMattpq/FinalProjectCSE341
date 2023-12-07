const express = require('express');
const router = express.Router();
const appointmentsController = require('../controllers/appointments');

// Importing validations
const validation = require('../middleware/validation');

router.get('/', appointmentsController.getAll);
router.get('/:id', appointmentsController.getSingle);
router.post('/',validation.saveAppointment, appointmentsController.createAppointments);
router.put('/:id',validation.saveAppointment, appointmentsController.updateAppointments);
router.delete('/:id',validation.saveAppointment, appointmentsController.deleteAppointments);

module.exports = router;
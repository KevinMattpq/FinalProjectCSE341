const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
    const result = await mongodb.getDb().db().collection('appointments').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
}

const getSingle = async (req, res, next) => {
    try {
        if(!ObjectId.isValid(req.params.id)){
            res.status(400).json('Must use a valid id to get the Appointment')
          }
        const appointmentId = new ObjectId(req.params.id);
        const result = await mongodb.getDb().db().collection('appointments').findOne({ _id: appointmentId });
        if (result) {
            res.setHeader('Content-type', 'application/json');
            res.status(200).json(result);
        } else {
            res.status(400).json({ error: 'No Appointments found' });
        }
        } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'server error' });
        }
};
const createAppointments = async (req, res) => {
    const newAppointment = {
        idPlayer: req.body.idPlayer,
        clubInterested: req.body.clubInterested,
        yearOfContract: req.body.yearOfContract,
        phoneNumber: req.body.phoneNumber,
        dateOfInterview: req.body.dateOfInterview
        }
        const result = await mongodb.getDb().db().collection('appointments').insertOne(newAppointment);
        if(result){
        res.setHeader('Content-type', 'application/json');
        res.status(201).json(result);
        }else{
        console.error(error);
        res.status(400).json({ error: 'Server error'});
        }
};
const updateAppointments = async (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).json('Must use a valid id to get the Appointment')
      }
    const appointmentId = new ObjectId(req.params.id)
    const updatedAppointment = {
        idPlayer: req.body.idPlayer,
        clubInterested: req.body.clubInterested,
        yearOfContract: req.body.yearOfContract,
        phoneNumber: req.body.phoneNumber,
        dateOfInterview: req.body.dateOfInterview
    };
      const result = await mongodb
      .getDb()
      .db()
      .collection('appointmnets')
      .replaceOne({_id: appointmentId},updatedAppointment);
      if (result.modifiedCount > 0){
        res.status(204).send(result);
      }else{
        res.status(400).json(response.error || 'Some error ocurred while updating the Appointment information');
      }
};

const deleteAppointments = async (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).json('Must use a valid id to get the Appointment')
      }
    const appointmentId = new ObjectId(req.params.id)
    const result = await mongodb.getDb().db().collection('appointmnets').deleteOne({_id: appointmentId});
    if (result){
      res.setHeader('Content-type', 'application/json');
      res.status(200).send(result);
    }else{
      res.status(400).json(response.error || 'Some error ocurred while deleting the Appointment');
    }
};



module.exports = {
    getAll,
    getSingle,
    createAppointments,
    updateAppointments,
    deleteAppointments
};
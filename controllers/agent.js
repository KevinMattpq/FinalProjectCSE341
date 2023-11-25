const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;


// Showing All Agents in database
const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('agents').find();
  result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
  });
};

// Getting a Single Agent
const getAgent = async(req, res) => {
  try {
    const agentId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('agents').findOne({ _id: agentId });
    if (result) {
      res.setHeader('Content-type', 'application/json');
      res.status(200).json(result);
    } else {
      res.status(400).json({ error: 'No Agent found' });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'server error' });
  }
};

// Creating an Agent
const createAgent = async(req, res) => {
  const newAgent = {
    agentName: req.body.agentName,
    agentLastname: req.body.agentLastname,
    agentClub: req.body.agentClub,
    agentEmail: req.body.agentEmail,
    agentPhone: req.body.agentPhone
  }
  const result = await mongodb.getDb().db().collection('agents').insertOne(newAgent);
  if(result){
    res.setHeader('Content-type', 'application/json');
    res.status(201).json(result);
  }else{
    console.error(error);
    res.status(400).json({ error: 'Server error'});
  }
}

// Updating Agent Information
const updateAgent = async (req, res) => {
  const agentId = new ObjectId(req.params.id)
  const updateAgent = {
      agentName: req.body.agentName,
      agentLastname: req.body.agentLastname,
      agentClub: req.body.agentClub,
      agentEmail: req.body.agentEmail,
      agentPhone: req.body.agentPhone
  };
    const result = await mongodb
    .getDb()
    .db()
    .collection('agents')
    .replaceOne({_id: agentId},updateAgent);
    if (result.modifiedCount > 0){
      res.status(204).send(result);
    }else{
      res.status(400).json(response.error || 'Some error ocurred while updating the Agent information');
    }
  
};

// Deleting Agent
const deleteAgent = async (req, res) => {
  const agentId = new ObjectId(req.params.id)
      const result = await mongodb.getDb().db().collection('agents').deleteOne({_id: agentId});
      if (result){
        res.setHeader('Content-type', 'application/json');
        res.status(200).send(result);
      }else{
        res.status(400).json(response.error || 'Some error ocurred while deleting the Agent');
      }
};

module.exports = {
  createAgent ,getAll, getAgent, updateAgent, deleteAgent
}
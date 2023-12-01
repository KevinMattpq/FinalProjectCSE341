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
    if(!ObjectId.isValid(req.params.id)){
      res.status(400).json('Must use a valid id to get the Agent')
    }
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
const createAgent = async(req, res, next) => {
  try{
    if (!req.body.agentName || !req.body.agentLastname || !req.body.agentEmail || !req.body.agentClub ||!req.body.agentPhone) {
      res.status(400).send({ message: 'Content can not be empty!' });
      return;
    }
    const userDb = mongodb.getDb().db().collection('agents');
    const agentname = req.body.agentName;
    const email = req.body.agentEmail;

    const existingAgent = await userDb.findOne({ agentname: agentname });
    if (existingAgent) {
      return res.status(409).json({ message: 'Agent name already in use' });
    }
    const existingEmail = await userDb.findOne({ email: email });
    if (existingEmail) {
      return res.status(409).json({ message: 'Email already in use' });
    }
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
    res.status(400).json({ error: 'Some error occurred while creating the agent'});
  }
} catch (error) {
  console.error(error);
  res.status(400).json({ error: 'server error' });
}
}

// Updating Agent Information
const updateAgent = async (req, res) => {
  try{
    if(!ObjectId.isValid(req.params.id)){
      res.status(400).json('Must use a valid id to update the agent')
    }
  const userDb = mongodb.getDb().db().collection('agents');
    const agentname = req.body.agentName;
    const email = req.body.agentEmail;

    const existingAgent = await userDb.findOne({ agentname: agentname });
    if (existingAgent) {
      return res.status(409).json({ message: 'Agent name already in use' });
    }
    const existingEmail = await userDb.findOne({ email: email });
    if (existingEmail) {
      return res.status(409).json({ message: 'Email already in use' });
    }
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
  }catch (error) {
    console.error(error);
    res.status(400).json({ error: 'server error' });
  }
};

// Deleting Agent
const deleteAgent = async (req, res) => {
  try{
    if(!ObjectId.isValid(req.params.id)){
      res.status(400).json('Must use a valid id to update the agent')
  }
  const agentId = new ObjectId(req.params.id)
      const result = await mongodb.getDb().db().collection('agents').deleteOne({_id: agentId});
      if (result){
        res.setHeader('Content-type', 'application/json');
        res.status(200).send(result);
      }else{
        res.status(400).json(response.error || 'Some error ocurred while deleting the Agent');
      }
    }catch (error) {
      console.error(error);
      res.status(400).json({ error: 'server error' });
    }
};

module.exports = {
  createAgent ,getAll, getAgent, updateAgent, deleteAgent
}
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
    const result = await mongodb.getDb().db().collection('players').find();
    result.toArray().then((lists) => {
          res.setHeader('Content-Type', 'application/json');
          res.status(200).json(lists);
      });
}

const getSingle = async (req, res, next) => {
    try {
        if(!ObjectId.isValid(req.params.id)){
            res.status(400).json('Must use a valid id to get the result')
          }
        const playerId = new ObjectId(req.params.id);
        const result = await mongodb.getDb().db().collection('players').findOne({ _id: playerId });
       if (result) {
           res.setHeader('Content-type', 'application/json');
           res.status(200).json(result);
       } else {
           res.status(400).json({ error: 'No Player found' });
       }
       } catch (error) {
       console.error(error);
       res.status(400).json({ error: 'server error' });
       }
};
const createPlayers = async (req, res) => {
    try{
    const newPlayer = {
        playerName: req.body.playerName,
        playerPosition: req.body.playerPosition,
        currentClub: req.body.currentClub,
        playerAge: req.body.playerAge,
        marketPrice: req.body.marketPrice,
        currentSalary: req.body.currentSalary,
        endOfContract: req.body.endOfContract
    }
    const result = await mongodb.getDb().db().collection('players').insertOne(newPlayer);
    if(result){
    res.setHeader('Content-type', 'application/json');
    res.status(201).json(result);
    }else{
    console.error(error);
    res.status(400).json({ error: 'Server error'});
    }
    }catch (error) {
        console.error(error);
        res.status(400).json({ error: 'server error' });
      }
};
const updatePlayers = async (req, res) => {
    try{
        if(!ObjectId.isValid(req.params.id)){
            res.status(400).json('Must use a valid id to get the Player')
          }
        const playerId = new ObjectId(req.params.id)
        const updatedPlayer = {
            playerName: req.body.playerName,
            playerPosition: req.body.playerPosition,
            currentClub: req.body.currentClub,
            playerAge: req.body.playerAge,
            marketPrice: req.body.marketPrice,
            currentSalary: req.body.currentSalary,
            endOfContract: req.body.endOfContract
        };
        const result = await mongodb.getDb().db().collection('players').replaceOne({_id: playerId},updatedPlayer);
        if (result.modifiedCount > 0){
        res.status(204).send(result);
        }else{
        res.status(400).json(response.error || 'Some error ocurred while updating the Player information');
        }
}catch (error) {
    console.error(error);
    res.status(400).json({ error: 'server error' });
  }
};

const deletePlayers = async (req, res) => {
    try{
        if(!ObjectId.isValid(req.params.id)){
            res.status(400).json('Must use a valid id to get the Agent')
          }
    const playerId = new ObjectId(req.params.id)
    const result = await mongodb.getDb().db().collection('players').deleteOne({_id: playerId});
    if (result){
      res.setHeader('Content-type', 'application/json');
      res.status(200).send(result);
    }else{
      res.status(400).json(response.error || 'Some error ocurred while deleting the Player');
    }    if(!ObjectId.isValid(req.params.id)){
      res.status(400).json('Must use a valid id to get the Agent')
    }
    }catch (error) {
        console.error(error);
        res.status(400).json({ error: 'server error' });
      }
};



module.exports = {
    getAll,
    getSingle,
    createPlayers,
    updatePlayers,
    deletePlayers
};
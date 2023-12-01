const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  const result = await mongodb.getDb().db().collection('clubs').find();
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
     const clubId = new ObjectId(req.params.id);
     const result = await mongodb.getDb().db().collection('clubs').findOne({ _id: clubId });
    if (result) {
        res.setHeader('Content-type', 'application/json');
        res.status(200).json(result);
    } else {
        res.status(400).json({ error: 'No Club found' });
    }
    } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'server error' });
    }
};

const createClubs = async (req, res) => {
    const newClub = {
        clubName: req.body.clubName,
        clubYearFounded: req.body.clubYearFounded,
        clubUefaTitles: req.body.clubUefaTitles,
        clubNationalLeagueTitles: req.body.clubNationalLeagueTitles,
        clubNetWorth: req.body.clubNetWorth,
        clubTransfersBudget: req.body.clubTransfersBudget
        }
        const result = await mongodb.getDb().db().collection('clubs').insertOne(newClub);
        if(result){
        res.setHeader('Content-type', 'application/json');
        res.status(201).json(result);
        }else{
        console.error(error);
        res.status(400).json({ error: 'Server error'});
        }
};

const updateClubs = async (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).json('Must use a valid id to get the Club')
      }
    const clubId = new ObjectId(req.params.id)
    const updatedClub = {
        clubName: req.body.clubName,
        clubYearFounded: req.body.clubYearFounded,
        clubUefaTitles: req.body.clubUefaTitles,
        clubNationalLeagueTitles: req.body.clubNationalLeagueTitles,
        clubNetWorth: req.body.clubNetWorth,
        clubTransfersBudget: req.body.clubTransfersBudget
    };
    const result = await mongodb.getDb().db().collection('clubs').replaceOne({_id: clubId},updatedClub);
    if (result.modifiedCount > 0){
    res.status(204).send(result);
    }else{
    res.status(400).json(response.error || 'Some error ocurred while updating the Club information');
    }
};

const deleteClubs = async (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).json('Must use a valid id to get the Club')
      }
    const clubId = new ObjectId(req.params.id)
    const result = await mongodb.getDb().db().collection('clubs').deleteOne({_id: clubId});
    if (result){
      res.setHeader('Content-type', 'application/json');
      res.status(200).send(result);
    }else{
      res.status(400).json(response.error || 'Some error ocurred while deleting the Club');
    }
};



module.exports = {
    getAll,
    getSingle,
    createClubs,
    updateClubs,
    deleteClubs
};
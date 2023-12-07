const validator = require('../helpers/validate');
const savePlayer = (req, res, next) => {
    
    const validationPlayer = {
        playerName: 'required|string',
        playerPosition: 'required|string',
        currentClub: 'required|string',
        playerAge: 'required|string',
        marketPrice: 'required|string',
        currentSalary: 'required|string',
        endOfContract: 'required|string'
    };
    validator(req.body, validationPlayer, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: 'Validation failed',
          data: err
        });
      } else {
        next();
      }
    });
  };

  const saveAgent = (req, res, next) => {
    const validationAgent = {
        agentName: 'required|string',
        agentLastname: 'required|string',
        agentClub: 'required|string',
        agentEmail: 'required|string',
        agentPhone: 'required|string'
    };
    validator(req.body, validationAgent, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: 'Validation failed',
          data: err
        });
      } else {
        next();
      }
    });
  };

  const saveClub = (req, res, next) => {
    const validationClub = {
        clubName: "required|string",
        clubYearFounded: "required|string",
        clubUefaTitles: "required|string",
        clubNationalLeagueTitles: "required|string",
        clubNetWorth: "required|string",
        clubTransfersBudget: "required|string"
    };
    validator(req.body, validationClub, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: 'Validation failed',
          data: err
        });
      } else {
        next();
      }
    });
  };

  const saveAppointment = (req, res, next) => {
    const validationAppointment = {
        idPlayer: "required|string",
        clubInterested: "required|string",
        yearOfContract: "required|string",
        phoneNumber: "required|string",
        dateOfInterview: "required|string"
    };
    validator(req.body, validationAppointment, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: 'Validation failed',
          data: err
        });
      } else {
        next();
      }
    });
  };
  

  module.exports = {
    savePlayer,saveAgent,saveClub,saveAppointment
  };
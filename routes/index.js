const express = require('express');
const router = express.Router();
// Adding Auth0
// const { auth } = require('express-openid-connect');

// const config = {
//   authRequired: false,
//   auth0Logout: true,
//   secret: 'a long, randomly-generated string stored in env',
//   baseURL: 'http://localhost:4000',
//   clientID: '0uu8nxzWFt5WHUIG9romvo5fjuvKYaoV',
//   issuerBaseURL: 'https://dev-hilr1ws8ejjafmrv.us.auth0.com'
// };



const agents = require('./agents');
const appointments = require('./appointments');
const clubs = require('./clubs');
const players = require('./players');

router.use('/', require('./swagger'));
router.use('/agents', agents);
router.use('/appointments',appointments);
router.use('/clubs',clubs);
router.use('/players',players);
router.use(
    '/',
    (docData = (req, res) =>{
    let docData = {
        documentationURL: 'https://github.com/KevinMattpq/FinalProjectCSE341',
    };
    res.send(docData);
    })
)

router.use('/agents', require('./agents'));

module.exports = router;
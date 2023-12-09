const express = require('express');
const router = express.Router();
// Adding Auth0
const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: 'https://soccertransferpro.onrender.com',
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  secret: process.env.SECRET_KEY
};

 // auth router attaches /login, /logout, and /callback routes to the baseURL
 router.use(auth(config));
  
 // req.isAuthenticated is provided from the auth router
 router.get('/', (req, res) => {
   res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')
 });

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
const express = require('express');
const router = express.Router();
const agents = require('./agents');

router.use('/agents', agents);
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
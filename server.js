const express = require('express');
const app = express();
const mongodb = require('./db/connect');
const bodyParser = require('body-parser');
const port = process.env.PORT || 4000;


// app.get('/', function (req, res) {
//   res.send('SoccerTransfer Pro - Roguin Espinal And Kevin Pena')
// })
app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  // .use('/', require('./routes'));

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});

// app.listen(port)
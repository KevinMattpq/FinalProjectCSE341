const express = require('express');
const app = express();
const mongodb = require('./db/connect');
const port = process.env.PORT || 3000;


app.get('/', function (req, res) {
  res.send('SoccerTransfer Pro - Roguin Espinal And Kevin Pena')
})

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});

app.listen(port)
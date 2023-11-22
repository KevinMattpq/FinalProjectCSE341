const express = require('express')
const app = express()
const port = process.env.PORT || 3000;


app.get('/', function (req, res) {
  res.send('SoccerTransfer Pro - Roguin Espinal And Kevin Pena')
})

app.listen(port)
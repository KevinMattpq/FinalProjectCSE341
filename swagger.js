const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info:{
        title:'SoccerTransfer Pro',
        description:'SoccerTransfer Pro'
    },
    host: 'soccertransferpro.onrender.com',
    schemes:['https']
}; 

const outFile = './swagger.json';
const endpointFiles = ['./routes/index.js']

swaggerAutogen(outFile, endpointFiles, doc)
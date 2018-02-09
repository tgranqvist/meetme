const path = require('path'),
    bodyParser = require('body-parser'),
    api = require('express')();

api.use(bodyParser.json());

api.get('/', (request, response) => {
    console.log(request.url);
    response.sendFile(path.join(__dirname, 'public', 'api.html'));
});

api.post('/metrics', (request, response) => {
    console.log(`metric api called with json.stringify(${request.body})`);
    response.send(request.body);
});

api.post('/social', (request, response) => {
    console.log(`social api called with json.stringify(${request.body})`);
    response.send(request.body);    
});

module.exports = api;

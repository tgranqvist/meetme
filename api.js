const path = require('path'),
    bodyParser = require('body-parser'),
    api = require('express')();

api.use(bodyParser.json());

api.get('/', (request, response) => {
    console.log(request.url);
    response.sendFile(path.join(__dirname, 'public', 'api.html'));
});

api.post('/cardiac', (request, response) => {
    console.log(`Cardiac endpoint called with ${JSON.stringify(request.body)}`);
    response.send(request.body);
});

api.post('/bgluc', (request, response) => {
    console.log(`Blood gluose endpoint called with ${JSON.stringify(request.body)}`);
    response.send(request.body);
});

api.post('/spo2', (request, response) => {
    console.log(`Oxygen saturation endpoint called with ${JSON.stringify(request.body)}`);
    response.send(request.body);
});

api.post('/sleep', (request, response) => {
    console.log(`Sleep endpoint called with json.stringify(${request.body})`);
    response.send(request.body);
});

api.post('/social', (request, response) => {
    console.log(`social api called with ${JSON.stringify(request.body)}`);
    response.send(request.body);    
});

module.exports = api;

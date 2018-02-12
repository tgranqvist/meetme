const path = require('path'),
    requests = require('request'),
    bodyParser = require('body-parser'),    
    api = require('express').Router(),
    callRequest = {
        uri: `https://api.twilio.com/2010-04-01/Accounts/${process.env.SID}/Calls`,
        auth: {'user': process.env.SID, 'pass': process.env.TOKEN},
        formData: {
	    Url: 'https://tkjg.fi/meetme/call.xml',
            From: process.env['Twilio.From'],
            To: '',
	    Method: 'GET'
        }
    };


api.use(bodyParser.json());

api.get('/', (request, response) => {
    console.log(request.url);
    response.sendFile(path.join(__dirname, 'public', 'api.html'));
});

api.post('/cardiac', (request, response) => {
    console.log(`Cardiac endpoint called with ${JSON.stringify(request.body)}`);
    response.send(request.body);
    const data = { "type": "rr", payload: request.body };
    request.updates.clients.forEach(client => {
        client.send(JSON.stringify(data));
    });
});

api.post('/bgluc', (request, response) => {
    console.log(`Blood gluose endpoint called with ${JSON.stringify(request.body)}`);
    response.send(request.body);
    const data = { "type": "bgluc", payload: request.body };
    request.updates.clients.forEach(client => {
        client.send(JSON.stringify(data));
    });
});

api.post('/spo2', (request, response) => {
    console.log(`Oxygen saturation endpoint called with ${JSON.stringify(request.body)}`);
    response.send(request.body);
    const data = { "type": "spo2", payload: request.body };
    request.updates.clients.forEach(client => {
        client.send(JSON.stringify(data));
    });
});

api.post('/sleep', (request, response) => {
    console.log(`Sleep endpoint called with ${JSON.stringify(request.body)}`);
    res.send(req.body);
    const data = { "type": "sleep", payload: req.body };
    reqquest.updates.clients.forEach(client => {
        client.send(JSON.stringify(data));
    });
});

api.post('/social/calls', (request, response) => {
    console.log(`social api called with ${JSON.stringify(request.body)}`);
    response.send(request.body);
    const recipient = process.env[`Recipients.${request.body.to}`];
    callRequest.formData.To = recipient;
    console.log(callRequest);
    requests.post(callRequest, (error, response, body) => {
        if (!error && response.statusCode == 201) {
            console.log('Call placed!');
        } else {
            console.log(`Something borked: ${error}`);
        }
    });
});

module.exports = api;

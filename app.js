require('dotenv').load();

const path = require('path'),
    app = require('express')(),
    ws = require('express-ws')(app);

const PORT = process.env.PORT || 8300;

// Dependency injection  middleware. Makes utility objects available
// to all route handlers.
app.use((request, response, next) => {
    request.updates = ws.getWss('updates');
    next();
});

app.ws('/updates', (socket, request) => {
    socket.on('message', message => {
        console.log(message);
        socket.send(message);
    });
});

app.get('/', (request, response) => {
    console.log(request.url);
    response.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/alexa', (request, response) => {
    console.log(request.url);
    response.sendFile(path.join(__dirname, 'public', 'alexa.html'));
});

app.use('/api', require('./api'));

app.use((error, request, response, next) => {
    console.error(error.stack);
    response.status(500).send('B0rken');
});

app.listen(PORT, () => console.log(`Testing app listening on ${PORT}`));

const path = require('path');
const app = require('express')();

const PORT = process.env.PORT || 8300;

app.get('/', (request, response) => {
    console.log(request.url);
    response.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use((error, request, response, next) => {
    console.error(error.stack);
    response.status(500).send('B0rken');
});

app.listen(PORT, () => console.log(`Testing app listening on ${PORT}`));

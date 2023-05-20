const express = require('express');
const http = require('http');

const app = express();

const favorites = [];

app.get('/favorites', (request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.json(favorites);
});

app.post('/favorites/:id', (request, response) => {
    const id = request.params.id;
    favorites.push(id);
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.json(favorites);
});

app.delete('/favorites/:id', (request, response) => {
    const id = request.params.id;
    const index = favorites.indexOf(id);
    if (index > -1) {
        favorites.splice(index, 1);
    }
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.json(favorites);
});

app.get('/neo/rest/v1/feed', (request, response) => {
    const options = {
        hostname: 'api.nasa.gov',
        port: 80,
        path: request.url,
        method: request.method
    };
    response.setHeader('Access-Control-Allow-Origin', '*');

    const proxy = http.request(options, (res) => {
        res.on('data', (chunk) => {
            response.write(chunk);
        });

        res.on('end', () => {
            response.end();
        });

        
        response.writeHead(res.statusCode, res.headers);
    });


    request.on('data', (chunk) => {
        proxy.write(chunk);
    });

    request.on('end', () => {
        proxy.end();
    });

    proxy.on('error', (err) => {
        console.log('Error: ', err);
    });
    
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



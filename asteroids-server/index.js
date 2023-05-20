const http = require('http');

const forwardRequestToAPI = (request, response) => {
    const options = {
        hostname: 'api.nasa.gov',
        port: 80,
        path: request.url,
        method: request.method
    };

    const proxy = http.request(options, (res) => {
        res.on('data', (chunk) => {
            response.write(chunk, 'binary');
        });

        res.on('end', () => {
            response.end();
        });

        response.setHeader('Access-Control-Allow-Origin', '*');
        response.writeHead(res.statusCode, res.headers);

    });

    request.on('data', (chunk) => {
        proxy.write(chunk, 'binary');
    });

    request.on('end', () => {
        proxy.end();
    });

    proxy.on('error', (err) => {
        console.log('Error: ', err);
    });

};


const app = http.createServer(forwardRequestToAPI);


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    }
);


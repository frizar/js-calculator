'use strict';

const http = require('http');
const nodeStatic = require('node-static');

const fileServer = new nodeStatic.Server('./public');

const server = http.createServer((req, res) => {
    req.addListener('end', () => {
        fileServer.serve(req, res);
    }).resume();
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server listening port ${PORT}`);
});

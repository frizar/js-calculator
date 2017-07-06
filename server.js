'use strict';

const http = require('http');
const Koa = require('koa');
const serve = require('koa-static');

const app = new Koa();

app.use(serve('./public'));
app.use(serve('./node_modules'));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server listening port ${PORT}`);
});

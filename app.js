const express = require('express');
const bodyParser = require('body-parser');
const mongoClient = require('./db/database');
const product = require('./router/product');
const users = require('./router/auth');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS, PUT, PATCH");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.use('/api', users);
app.use('/api', product);


mongoClient.connect().then(res=> {
    app.listen(3500);
});
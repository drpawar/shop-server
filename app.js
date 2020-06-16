const express = require('express');
const bodyParser = require('body-parser');
const mongoClient = require('./databaseServer/mongoConn');
const product = require('./router/product');
const users = require('./router/users');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS, PUT, PATCH");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.use('', users);
app.use('', product);


mongoClient.connect().then(res=> {
    app.listen(3500);
});
const express = require('express');
const mongoClient = require('../databaseServer/mongoConn');
const router = express.Router();

router.get('/getProduct', (req, res, next) => {
    mongoClient.db("shopDb").collection("shop").find().toArray().then(db => {
        // console.log(db);
        res.send({ data: db })
    })
    .catch(err => {
        res.send({ error: err })
    });
})

router.post('/newProduct', (req, res, next) => {
    // console.log(req);
    const newProduct = {
        productName: req.body.productName,
        productPrice: parseFloat(req.body.productPrice),
        productImage: req.body.productImg
    }

    mongoClient.db("shopDb").collection("shop").insertOne(newProduct).then(db => {
        res.send({ message: 'successful' })
    })
    .catch(err => {
        res.send({ error: err })
    });
})

module.exports = router;
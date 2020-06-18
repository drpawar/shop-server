const mongoClient = require('../db/mongoClient');

exports.getProduct = (req, res, next) => {
    mongoClient.db("shopDb").collection("shop").find().toArray().then(db => {
        // console.log(db);
        res.send({ data: db })
    })
    .catch(err => {
        res.send({ error: err })
    });
}

exports.addProduct = (req, res, next) => {
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
}
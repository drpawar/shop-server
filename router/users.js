const express = require('express');
const bcrypt = require('bcryptjs');
const mongoClient = require('../databaseServer/mongoConn');
const router = express.Router();

router.post('/login', (req, res) => {
    console.log(req.body, "body..");
    const email = req.body.email;
    const pw = req.body.password;
    
    mongoClient.db('userDb').collection('users').findOne({ userName: req.body.email })
        .then((db) => {
            console.log(db);
            if (db == null) {
                return res.send({ error: "This user is not available. Please sign up!" })
            }
            return bcrypt.compare(pw, db.password)            
        })
        .then((db)=> {
            console.log(db);
            res.send({
                response: db,
                email: email,
                // token: 
            });
        })
        .catch((err) => {

            res.send({
                error: err
            });
        })
})

router.post('/signup', (req, res) => {
    console.log(req.body, "body..");
    const email = req.body.email;
    const pw = req.body.password;
    bcrypt.hash(pw, 15)
        .then(hashedPW => {
            console.log(hashedPW);
            return mongoClient.db('userDb').collection('users').insertOne({ userName: req.body.email, password: hashedPW })
        })
        .then((db) => {
            console.log(db);
            res.send({
                message: db
            });
        })
        .catch((err) => {

            res.send({
                error: err
            });
        })
})

module.exports = router;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoClient = require('../db/mongoClient');

const createToken = (userId, email) => {
    return jwt.sign({ userId, userId, email: email }, 'shop-server-project', { expiresIn: '1h' });
};

exports.login = (req, res) => {
    // console.log(req.body, "body..");
    const email = req.body.email;
    const pw = req.body.password;
    let token = null;

    mongoClient.db('userDb').collection('users').findOne({ userName: req.body.email })
        .then((result) => {
            // console.log(db);
            if (result == null) {
                return res.send({ error: "This user is not available. Please sign up!" })
            }
            token = createToken(result._id, result.userName);
            // console.log(token, " token")
            return bcrypt.compare(pw, result.password)
        })
        .then((result) => {
            // console.log(result);
            if (!result) {
                throw Error();
            }
            res.send({
                email: email,
                token: token
            });
        })
        .catch((err) => {
            res.status(401).send({
                error: "User and Password not correct!"
            });
        })
}

exports.register = (req, res) => {
    // console.log(req.body, "body..");
    const email = req.body.email;
    const pw = req.body.password;
    mongoClient.db('userDb').collection('users').findOne({ userName: req.body.email })
        .then((result) => {
            if (result) {
                return res.send({ error: "This user is already exist!" })
            }
            return bcrypt.hash(pw, 15)
        })
        .then(hashedPW => {
            console.log(hashedPW);
            return mongoClient.db('userDb').collection('users').insertOne({ userName: req.body.email, password: hashedPW })
        })
        .then((db) => {
            // console.log(db);
            res.send({
                message: db
            });
        })
        .catch((err) => {
            if (!err) {
                return res.send({ error: "Something went wrong!" })
            }
            res.send({
                error: err
            });
        })
}
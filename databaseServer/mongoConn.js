const mongoDb = require('mongodb').MongoClient;

const uri = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false";
const client = new mongoDb(uri, { useNewUrlParser: true });


module.exports = client


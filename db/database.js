const mongoDbClient = require('mongodb').MongoClient;

const uri = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false";
const mongoClient = new mongoDbClient(uri, { useNewUrlParser: true });


module.exports = mongoClient


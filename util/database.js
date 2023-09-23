require('dotenv').config();
const mongodb = require('mongodb');
const { get } = require('../routes/admin');
const MongoClient = mongodb.MongoClient;

let db;

const mongoConnect = async () => {
    try {
        const client = await MongoClient.connect(`mongodb+srv://chpoonal:${process.env.DB_PASS}@node.ot6zfgm.mongodb.net/node`);
        if (!client) {
            throw new Error('cannot connect');
        }
        db = client.db();
    } catch (err) {
        console.log(err)
    }
}

const getDb = () => {
    if (db) {
        return db;
    }
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

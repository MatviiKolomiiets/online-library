const MONGO_ROOT_USERNAME = process.env.MONGO_ROOT_USERNAME || 'root';
const MONGO_ROOT_PASSWORD = process.env.MONGO_ROOT_PASSWORD || 'root';
const MONGO_HOST = process.env.MONGO_HOST || 'localhost:27017';

const mongoose = require('mongoose');

async function getMongooseCfg() {
    let mongooseClient = await mongoose.connect(`mongodb://${MONGO_ROOT_USERNAME}:${MONGO_ROOT_PASSWORD}@${MONGO_HOST}`);

    const usersSchema = new mongoose.Schema({
        name: String,
        email: String,
        password: String,
        created: Date,
        updated: Date
    })

    return {

        Users: mongooseClient.model('Users', usersSchema)
    }
}

module.exports = {
    getMongooseCfg
}
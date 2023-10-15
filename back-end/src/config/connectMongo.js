
const mongoose = require('mongoose')
const config = require('./setting')

const connectMongo = async () => {
    try {
        await mongoose.connect(config.mongoURL);
        const collectionsToCreate = ['users', 'posts'];
        for (const collectionName of collectionsToCreate) {
            const collectionExists = await mongoose.connection.db.listCollections().toArray();
            if (collectionExists) continue;
            if (!collectionExists.some(collection => collection.name === collectionName)) {
                await mongoose.connection.createCollection(collectionName);
            }
        }
        console.log(" connecting to MongoDB successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

module.exports = connectMongo

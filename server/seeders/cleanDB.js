const connectDB = require('../config/connection');
const models = require('../models');

module.exports = async (modelName, collectionName) => {
  try {
    await connectDB(); // Connect to the database

    const model = models[modelName];
    if (!model) {
      throw new Error(`Model '${modelName}' not found.`);
    }

    const collection = model.db.db.collection(collectionName);
    const collectionExists = await collection.countDocuments() > 0;

    if (collectionExists) {
      await collection.drop();
    }
  } catch (err) {
    throw err;
  }
};

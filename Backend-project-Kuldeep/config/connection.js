const { MongoClient } = require('mongodb');

async function connectToDB() {
  const uri = 'mongodb+srv://kuldeep0_0:Kuldeep12@cluster0.qkvgd0d.mongodb.net/shopping';
  
  try {
    const client = new MongoClient(uri);
    await client.connect();
    const database = client.db();
    
    return database;
  } catch (error) {
    console.error('Error connecting to the database', error);
    throw error;
  }
}

module.exports = {
  connectToDB
};

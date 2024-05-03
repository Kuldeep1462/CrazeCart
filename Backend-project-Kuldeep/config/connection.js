const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const { MongoClient } = require('mongodb');

// Connect to MongoDB
const uri = 'mongodb+srv://kuldeep0_0:Kuldeep12@cluster0.qkvgd0d.mongodb.net/shopping';
const client = new MongoClient(uri);

async function setupServer() {
  const app = express();
  
  try {
    await client.connect();
    const database = client.db();
    const sessionStore = new MongoDBStore({
      uri: uri,
      collection: 'sessions'
    });

    // Catch errors
    sessionStore.on('error', function (error) {
      console.error('Session Store Error:', error);
    });

    app.use(session({
      secret: 'your_secret_key',
      resave: false,
      saveUninitialized: false,
      store: sessionStore,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 1 day
      }
    }));

    // Other middleware and routes

    return app;
  } catch (error) {
    console.error('Error connecting to the database', error);
    throw error;
  }
}

module.exports = { setupServer };

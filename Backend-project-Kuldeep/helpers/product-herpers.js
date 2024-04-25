const { connectToDB } = require("../config/connection");
const collection = require("./collection");
const { ObjectId } = require('mongodb');

module.exports = {
  addProducts: async (product, callBack) => {
    try {
      const database = await connectToDB();
      await database.command({ ping: 1 });
      const collection = database.collection('Product'); 
      const result = await collection.insertOne(product);
      callBack(result.insertedId.toString());
    } catch (error) {
      console.error('Error adding product:', error);
    }
  },

  listAdminProducts: () => { 
    return new Promise(async (resolve, reject) => {
      const database = await connectToDB();
      const adminProducts = await database.collection(collection.COLLECTION_NAME).find().toArray();
      resolve(adminProducts);
    });
  },

  deleteProducts: (prodId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const database = await connectToDB();
        const collect = database.collection(collection.COLLECTION_NAME);
        const response = await collect.deleteOne({ _id: new ObjectId(prodId) });
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  },

  editProducts: (prodId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const database = await connectToDB();
        const product = await database.collection(collection.COLLECTION_NAME).findOne({ _id: new ObjectId(prodId) });
        resolve(product);
      } catch (error) {
        reject(error);
      }
    });
  },

  updateProducts: (prodId, products) => {
    return new Promise(async (resolve, reject) => {
      try {
        const database = await connectToDB();
        await database.collection(collection.COLLECTION_NAME).updateOne(
          { _id: new ObjectId(prodId) },
          {
            $set: {
              name: products.name,
              description: products.description,
              category: products.category,
              price: products.price
            }
          }
        );
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  },

  doLogin: (data) => {
    return new Promise(async (resolve, reject) => {
      try {

        const adminEmail = "kuldeepsinghparhar01@gmail.com";
        const adminPassword = "Kuldeep@12";

        if (data.email === adminEmail && data.password === adminPassword) {
          const admin = {
            status: true,
            admin: 'Admin',
          };
          resolve(admin);
        } else {
          const admin = {
            status: false,
          };
          resolve(admin);
        }
      } catch (error) {
        reject(error);
      }
    });
  },

  getUsers: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const database = await connectToDB();
        const users = await database.collection('users').find().toArray();
        resolve(users);
      } catch (error) {
        reject(error);
      }
    });
  },

  getOrders: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const database = await connectToDB();
        const orderData = await database.collection('placeOrder').aggregate([
          // Your aggregation pipeline stages here...
        ]).toArray();
        resolve(orderData);
      } catch (error) {
        reject(error);
      }
    });
  }
};

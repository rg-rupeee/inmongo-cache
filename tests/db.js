const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

let mongod;
const connect = async () => {
  mongod = await MongoMemoryServer.create();
  const uri = await mongod.getUri();

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 3000,
    serverSelectionTimeoutMS: 3000,
  });
};

const disconnect = async () => {
  await mongoose.disconnect();
  await mongod.stop();
};

module.exports = { connect, disconnect, mongoose };

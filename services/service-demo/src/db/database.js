const mongoose = require('mongoose');

let databaseName = 'user-account';

let mongoUrlLocal = `mongodb://admin:password@localhost:27017`;

let mongoClientOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: databaseName,
};

const connectDB = async () => {
  try {
    await mongoose.connect(mongoUrlLocal, mongoClientOptions);
    console.log(`MongoDB connected.`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;

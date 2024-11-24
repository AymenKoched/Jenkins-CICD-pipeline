import mongoose from 'mongoose';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const env = require('../../conf/env.json');

const isDocker = process.env.IS_DOCKER === 'true';
const mongoHost = isDocker
  ? env.database.dockerHost
  : `${env.database.host}:${env.database.port}`;

const mongoUrlLocal = `mongodb://${env.database.username}:${env.database.password}@${mongoHost}`;
const mongoClientOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: env.database.database,
};

const connectDB = async () => {
  try {
    await mongoose.connect(mongoUrlLocal, mongoClientOptions);
    console.log('MongoDB connected.');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  }
};

export default connectDB;

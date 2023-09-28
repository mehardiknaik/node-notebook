// import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

const connect = async () => {
  // const mongod = await MongoMemoryServer.create()
  // const geturl = mongod.getUri()

  // mongoose.set('strictQuery',true)
  return mongoose.connect(process.env.DB_URI, {
    serverSelectionTimeoutMS: 5000,
  });
};
export default connect;

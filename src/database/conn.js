// import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

const connect = async () => {
  // const mongod = await MongoMemoryServer.create()
  // const geturl = mongod.getUri()

  // mongoose.set('strictQuery',true)
  const db = await mongoose
    .connect(process.env.DB_URI, {
      serverSelectionTimeoutMS: 5000,
    })
    .catch((e) => {
      console.log('Invalid Database Connection......', e);
    });
  console.log(
    `\x1b[92mDatabase Connected to \x1b[93m${process.env.DB_URI}\x1b[0m`
  );
  return db;
};
export default connect;

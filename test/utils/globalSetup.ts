import { MongoMemoryServer } from 'mongodb-memory-server';

const globalSetup = async () => {
  const mongoServer: MongoMemoryServer = await MongoMemoryServer.create();
  process.env.DB_CONNECTION_STRING = mongoServer.getUri();
  global.__MONGODB__ = mongoServer;
};

export default globalSetup;

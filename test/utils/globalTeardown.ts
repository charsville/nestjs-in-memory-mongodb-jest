import { MongoMemoryServer } from 'mongodb-memory-server';

const globalTeardown = async () => {
  await (global.__MONGODB__ as MongoMemoryServer).stop();
  global.__MONGODB__ = undefined;
  process.env.DB_CONNECTION_STRING = undefined;
};

export default globalTeardown;

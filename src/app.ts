import 'dotenv/config';

import { Server } from './presentation/server';
import { MongoDataBase } from './data/mongodb';
import { envs } from './config/plugins/envs.plugin';

(async () => {
  main();
})();

async function main() {
  const mongoUrl = envs.MONGO_DB_URL;
  const mongoDbName = envs.MONGO_DB_NAME;

  const connected = await MongoDataBase.connect({ mongoUrl, mongoDbName });

  if (connected === 1) {
    console.log('MongoDB connected');
    Server.start();
  }
}

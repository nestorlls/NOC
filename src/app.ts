import 'dotenv/config';

import { Server } from './presentation/server';
import { MongoDataBase } from './data/mongo';
import { envs } from './config/plugins/envs.plugin';

(async () => {
  main();
})();

async function main() {
  const mongoUrl = envs.MONGO_DB_URL;
  const mongoDbName = envs.MONGO_DB_NAME;

  await MongoDataBase.connect({ mongoUrl, mongoDbName });

  Server.start();
}

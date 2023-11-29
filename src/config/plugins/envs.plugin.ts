import 'dotenv/config';
import * as env from 'env-var';

export const envs = {
  PORT: env.get('PORT').required().asPortNumber(),
  MAILER_SERVICE: env.get('MAILER_SERVICE').required().asString(),
  MAILER_MAIL: env.get('MAILER_MAIL').required().asEmailString(),
  MAILER_MAIL_SECRET_KEY: env
    .get('MAILER_MAIL_SECRET_KEY')
    .required()
    .asString(),
  PROD: env.get('PROD').required().asBool(),
  MONGO_DB_URL: env.get('MONGO_DB_URL').required().asString(),
  MONGO_DB_NAME: env.get('MONGO_DB_NAME').required().asString(),
  MONGO_DB_USER: env.get('MONGO_DB_USER').required().asString(),
  MONGO_DB_PASS: env.get('MONGO_DB_PASS').required().asString(),
  POSTGRES_URL: env.get('POSTGRES_URL').required().asString(),
  POSTGRES_USER: env.get('POSTGRES_USER').required().asString(),
  POSTGRES_PASS: env.get('POSTGRES_PASS').required().asString(),
  POSTGRES_DB: env.get('POSTGRES_DB').required().asString(),
};

import { envs } from '../../../src/config/plugins/envs.plugin';

describe('Test envs plugin envs.plugin.ts', () => {
  test('Should return envs correctly', () => {
    expect(envs).toEqual({
      PORT: 3000,
      MAILER_SERVICE: 'gmail',
      MAILER_MAIL: 'email@gooel.com',
      MAILER_MAIL_SECRET_KEY: 'tvwpexqhsrqommlt',
      PROD: false,
      MONGO_DB_URL: 'mongodb://paul:123456789@localhost:27017',
      MONGO_DB_NAME: 'NOC-TEST',
      MONGO_DB_USER: 'paul',
      MONGO_DB_PASS: '123456789',
      POSTGRES_URL:
        'postgresql://postgres:123456789@localhost:5432/NOC-TEST?schema=public',
      POSTGRES_USER: 'postgres',
      POSTGRES_PASS: '123456789',
      POSTGRES_DB: 'NOC-TEST',
    });
  });

  test('Should return error if not found env PORT', async () => {
    jest.resetModules();
    process.env.PORT = 'ASDF';

    try {
      await import('../../../src/config/plugins/envs.plugin');
      expect(true).toBe(false);
    } catch (error) {
      expect(`${error}`).toContain('"PORT" should be a valid integer');
    }
  });
});

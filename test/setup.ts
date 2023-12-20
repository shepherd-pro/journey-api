import { afterAll, beforeAll } from 'bun:test';
import { migrate } from 'drizzle-orm/bun-sqlite/migrator';
import { unlink } from 'node:fs/promises';
import { db, getConnection, endConnection } from '../src/db';
import { seedDatabase } from '../src/seed';

beforeAll(async () => {
  await getConnection('test.sqlite');
  const database = await db();
  migrate(database, { migrationsFolder: './drizzle' });
  await seedDatabase();
});

afterAll(async () => {
  await unlink('./test.sqlite');
  endConnection();
});

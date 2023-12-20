import { migrate } from 'drizzle-orm/bun-sqlite/migrator';
import { db } from './db';

const database = await db();
migrate(database, { migrationsFolder: './drizzle' });

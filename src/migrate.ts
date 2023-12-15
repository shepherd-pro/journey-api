import { migrate } from 'drizzle-orm/bun-sqlite/migrator';
import { db } from './db';

export default migrate(db, { migrationsFolder: './drizzle' });

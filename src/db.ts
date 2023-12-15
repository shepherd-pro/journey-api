import { drizzle } from 'drizzle-orm/bun-sqlite';
import { Database } from 'bun:sqlite';
import * as schema from './schema';

export const sqlite = new Database('test.sqlite');
export const db = drizzle(sqlite, { schema });

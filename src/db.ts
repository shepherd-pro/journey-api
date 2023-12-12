import { drizzle } from 'drizzle-orm/bun-sqlite';
import { Database } from 'bun:sqlite';

export const sqlite = new Database(':memory:');
export const db = drizzle(sqlite);

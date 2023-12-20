import { drizzle } from 'drizzle-orm/bun-sqlite';
import { Database } from 'bun:sqlite';
import * as schema from './schema';

let connection: Database | undefined;

export async function getConnection(databaseLocation = 'journeys.sqlite') {
  if (!connection) {
    connection = await new Database(databaseLocation);
  }

  return connection;
}

export function endConnection() {
  if (connection) {
    connection.close();
    connection = undefined;
  }
}

export const db = async () => drizzle(await getConnection(), { schema });

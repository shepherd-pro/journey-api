import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config();

export default {
  schema: './src/*',
  out: './drizzle',
  driver: 'better-sqlite',
  dbCredentials: {
    url: 'test.sqlite'
  },
  verbose: true,
  strict: true
} satisfies Config;

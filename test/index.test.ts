import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { migrate } from 'drizzle-orm/bun-sqlite/migrator';
import { app } from '../src/index';
import { db, sqlite } from '../src/db';
import { journeys } from '../src/schema';

beforeEach(async () => {
  migrate(db, { migrationsFolder: './drizzle' });
  await db.insert(journeys).values([
    {
      confirmCancel: true,
      confirmCancelMessage: 'Are you sure you want to stop the tour?',
      classPrefix: 'shepherd-test',
      defaultStepOptions: {
        scrollTo: true
      },
      exitOnEsc: true,
      keyboardNavigation: true,
      modalContainer: 'body',
      stepsContainer: 'body',
      steps: [
        {
          id: 'welcome',
          options: {
            attachTo: {
              element: '.welcome',
              on: 'bottom'
            },
            text: 'Welcome to Elysia!'
          }
        }
      ],
      tourName: 'test',
      useModalOverlay: true
    }
  ]);

  console.log(`🌱 Seeding complete.`);
});

afterEach(() => {
  sqlite.close();
});

const baseUrl = `${app.server?.hostname}:${app.server?.port}/journeys`; // localhost:3000/journeys

describe('Journeys Test suite', () => {
  it('should return a journey successfully using existing id', async () => {
    const id = '1';

    const req = new Request(`${baseUrl}/${id}`);
    const res = await app.fetch(req);
    expect(res.status).toEqual(200);

    const responseBody = await res.json();

    expect(responseBody.id).toEqual(1);
    expect(responseBody.tourName).toEqual('test');
  });
});

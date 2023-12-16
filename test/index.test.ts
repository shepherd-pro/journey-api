import { afterAll, beforeAll, describe, expect, it } from 'bun:test';
import { migrate } from 'drizzle-orm/bun-sqlite/migrator';
import { app } from '../src/index';
import { db, sqlite } from '../src/db';
import { journeys } from '../src/schema';

beforeAll(async () => {
  migrate(db, { migrationsFolder: './drizzle' });
  await db.insert(journeys).values([
    {
      id: 1,
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

afterAll(() => {
  sqlite.close();
});

// localhost:3000/journeys
const baseUrl = `${app.server?.hostname}:${app.server?.port}/journeys`;

describe('Journeys Test suite', () => {
  describe('GET Journeys', () => {
    it('should return a journey successfully using existing id', async () => {
      const id = '1';

      const req = new Request(`${baseUrl}/${id}`);
      const res = await app.fetch(req);
      expect(res.status).toEqual(200);

      const responseBody = await res.json();

      expect(responseBody.id).toEqual(1);
      expect(responseBody.tourName).toEqual('test');
    });

    it('should fail to return a journey that does not exist', async () => {
      const journeyId = '2';

      const req = new Request(`${baseUrl}/${journeyId}`);
      const res = await app.fetch(req);

      expect(res.status).not.toEqual(200);
    });
  });

  describe('POST Journeys', () => {
    it('should create a journey successfully', async () => {
      const newJourney = {
        id: 2,
        tourName: 'test'
      };
      const req = new Request(baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newJourney)
      });
      const res = await app.fetch(req);
      expect(res.status).toEqual(200);

      const responseBody = await res.json();

      expect(responseBody.id).toEqual(2);
      expect(responseBody.tourName).toEqual('test');
    });
  });

  describe('PUT Journeys', () => {
    it('should update a journey successfully', async () => {
      const originalJourney = {
        tourName: 'test'
      };

      const updatedJourney = {
        tourName: 'updated test'
      };

      const journeyId = 2;

      const req = new Request(`${baseUrl}/${journeyId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedJourney)
      });

      const res = await app.fetch(req);
      expect(res.status).toEqual(200);

      const responseBody = await res.json();

      expect(responseBody.tourName).not.toEqual(originalJourney.tourName);
      expect(responseBody.tourName).toEqual(updatedJourney.tourName);
    });

    it('should fail to update a journey that does not exist', async () => {
      const updatedJourney = {
        tourName: 'bun bun bun'
      };

      const journeyId = 3;

      const req = new Request(`${baseUrl}/${journeyId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedJourney)
      });

      const res = await app.fetch(req);
      expect(res.status).not.toEqual(200);
    });
  });

  describe('DELETE Journeys', () => {
    it('should delete a Journey successfully', async () => {
      const journeyId = 2;

      const req = new Request(`${baseUrl}/${journeyId}`, {
        method: 'DELETE'
      });

      const res = await app.fetch(req);
      expect(res.status).toEqual(200);
    });

    it('should fail to delete a Journey that does not exist', async () => {
      const journeyId = 3;

      const req = new Request(`${baseUrl}/${journeyId}`, {
        method: 'DELETE'
      });

      const res = await app.fetch(req);
      expect(res.status).not.toEqual(200);
    });
  });
});

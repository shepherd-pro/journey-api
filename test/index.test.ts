import { afterAll, beforeAll, describe, expect, it } from 'bun:test';
import { migrate } from 'drizzle-orm/bun-sqlite/migrator';
import { unlink } from 'node:fs/promises';
import { app } from '../src/index';
import { db, sqlite } from '../src/db';
import { newJourneys, seedDatabase } from '../src/seed';

beforeAll(async () => {
  migrate(db, { migrationsFolder: './drizzle' });
  await seedDatabase();
});

afterAll(async () => {
  await unlink('./test.sqlite');
  sqlite.close();
});

// localhost:3000/journeys
const baseUrl = `${app.server?.hostname}:${app.server?.port}/journeys`;

describe('Journeys Test suite', () => {
  describe('GET Journeys', () => {
    it('should return a journey successfully using existing id', async () => {
      const id = 1;
      const seededJourney = newJourneys[0];

      const req = new Request(`${baseUrl}/${id}`);
      const res = await app.fetch(req);
      expect(res.status).toEqual(200);

      const responseBody = await res.json();

      expect(responseBody.id).toEqual(1);
      expect(responseBody.tourName).toEqual(seededJourney.tourName);
    });

    it('should fail to return a journey that does not exist', async () => {
      const journeyId = 20;

      const req = new Request(`${baseUrl}/${journeyId}`);
      const res = await app.fetch(req);

      expect(res.status).not.toEqual(200);
    });
  });

  describe('POST Journeys', () => {
    it('should create a journey successfully', async () => {
      const newJourney = {
        id: 11,
        tourName: 'Made in Test'
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

      expect(responseBody.id).toEqual(newJourney.id);
      expect(responseBody.tourName).toEqual(newJourney.tourName);
    });
  });

  describe('PUT Journeys', () => {
    it('should update a journey successfully', async () => {
      const originalJourney = {
        tourName: newJourneys[1].tourName
      };

      const updatedJourney = {
        tourName: 'Updated in test'
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

      const journeyId = 13;

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
      const journeyId = 13;

      const req = new Request(`${baseUrl}/${journeyId}`, {
        method: 'DELETE'
      });

      const res = await app.fetch(req);
      expect(res.status).not.toEqual(200);
    });
  });
});

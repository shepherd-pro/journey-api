import { Elysia } from 'elysia';
import { swagger } from '@elysiajs/swagger';
import { eq } from 'drizzle-orm';
import { db } from './db';
import { journeys } from './schema';

import Tour from 'shepherd.js/src/types/tour';

interface TourResponse extends Pick<Tour.TourOptions, 'tourName'> {
  id: number;
}

interface JourneyInput {
  tourName: string;
}

export const app = new Elysia().use(swagger());

app.group('/journeys', (app) =>
  app
    .delete('/:id', async ({ params: { id }, set }) => {
      try {
        const [existingJourney]: TourResponse[] = await db
          .select({
            id: journeys.id,
            tourName: journeys.tourName
          })
          .from(journeys)
          .where(eq(journeys.id, Number(id)));

        if (!existingJourney) {
          set.status = 404;
          return {
            message: `Journey with id: ${id} was not found.`,
            status: 404
          };
        }

        await db.delete(journeys).where(eq(journeys.id, Number(id)));

        return {
          message: `Journey deleted successfully!`,
          status: 200
        };
      } catch (e: unknown) {
        set.status = 500;
        return {
          message: 'Unable to delete Journey!',
          status: 500
        };
      }
    })
    .get('/:id', async ({ params: { id }, set }) => {
      try {
        const [existingJourney] = await db
          .select({
            id: journeys.id,
            tourName: journeys.tourName
          })
          .from(journeys)
          .where(eq(journeys.id, Number(id)));

        if (!existingJourney) {
          set.status = 404;
          return {
            message: 'Requested journey was not found!',
            status: 404
          };
        }

        return existingJourney;
      } catch (error) {
        set.status = 404;
        return {
          message: 'Unable to find Journey!',
          status: 404
        };
      }
    })
    .post('/', async ({ body, set }) => {
      try {
        const [newJourney] = await db
          .insert(journeys)
          .values(body as JourneyInput)
          .returning({
            id: journeys.id,
            tourName: journeys.tourName
          });

        return newJourney;
      } catch (error) {
        set.status = 500;
        return {
          message: 'Unable to save entry to the database!',
          status: 500
        };
      }
    })
    .put('/:id', async ({ body, params: { id }, set }) => {
      try {
        const [updatedJourney]: unknown[] = (await db
          .update(journeys)
          .set(body as JourneyInput)
          .where(eq(journeys.id, Number(id)))
          .returning({
            id: journeys.id,
            tourName: journeys.tourName
          })) as TourResponse[];

        if (!updatedJourney) {
          set.status = 404;
          return {
            message: `Journey with id: ${id} was not found.`,
            status: 404
          };
        }

        return updatedJourney;
      } catch (e: unknown) {
        set.status = 500;
        return {
          message: 'Unable to update Journey!',
          status: 500
        };
      }
    })
    .onError(({ code, error }) => {
      return new Response(error.toString());
    })
);

app.listen(3000, () =>
  console.log(
    `🐙 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
  )
);

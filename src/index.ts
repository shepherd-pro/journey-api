import { Elysia } from 'elysia';
import { swagger } from '@elysiajs/swagger';
import { eq } from 'drizzle-orm';
import { db } from './db';
import { journeys, Journey } from './schema';

import Tour from 'shepherd.js/src/types/tour';

interface TourResponse extends Pick<Tour.TourOptions, 'tourName'> {
  id: number;
}

const fieldSelectJourney = {
  id: journeys.id,
  tourName: journeys.tourName,
  modalContainer: journeys.modalContainer,
  confirmCancel: journeys.confirmCancel,
  confirmCancelMessage: journeys.confirmCancelMessage,
  classPrefix: journeys.classPrefix,
  defaultStepOptions: journeys.defaultStepOptions,
  exitOnEsc: journeys.exitOnEsc,
  keyboardNavigation: journeys.keyboardNavigation,
  stepsContainer: journeys.stepsContainer,
  useModalOverlay: journeys.useModalOverlay
};

export const app = new Elysia().use(swagger());

app.group('/journeys', (app) =>
  app
    .delete('/:id', async ({ params: { id }, set }) => {
      try {
        const [existingJourney] = await db
          .select(fieldSelectJourney)
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
        // TODO: determine why select ordering matters
        const [existingJourney]: Journey[] = await db
          .select(fieldSelectJourney)
          .from(journeys)
          .where(eq(journeys.id, Number(id)));

        if (!existingJourney) {
          set.status = 404;
          return {
            message: 'Requested journey was not found!',
            status: 404
          };
        }
        console.log(existingJourney, '🐑');
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
          .values(body as Omit<TourResponse, 'id'>)
          .returning(fieldSelectJourney);

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
        const [updatedJourney] = (await db
          .update(journeys)
          .set(body as Omit<TourResponse, 'id'>)
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
    `🐙 Journey API is running at ${app.server?.hostname}:${app.server?.port}`
  )
);

import { Elysia } from 'elysia';
import { swagger } from '@elysiajs/swagger';

import Tour from 'shepherd.js/src/types/tour';

interface TourResponse extends Tour.TourOptions {
  id: number;
}

export const app = new Elysia().use(swagger());

app.group('/journeys', (app) =>
  app
    .delete('/delete', () => {})
    .get(
      '/:id',
      ({ params: { id } }): TourResponse => ({
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
      })
    )
    .post('/create', () => {})
    .put('/update', () => {})
    .onError(({ code, error }) => {
      return new Response(error.toString());
    })
);

app.listen(3000, () =>
  console.log(
    `🐙 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
  )
);

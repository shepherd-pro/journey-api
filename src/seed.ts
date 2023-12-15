import { db } from './db';
import { journeys } from './schema';

await db.insert(journeys).values([
  {
    id: 1,
    confirmCancel: true,
    confirmCancelMessage: 'Are you sure you want to stop the tour?',
    classPrefix: 'shepherd-test',
    // defaultStepOptions: {
    //   scrollTo: true
    // },
    exitOnEsc: true,
    keyboardNavigation: true,
    // modalContainer: 'body',
    // stepsContainer: 'body',
    // steps: [
    //   {
    //     id: 'welcome',
    //     options: {
    //       attachTo: {
    //         element: '.welcome',
    //         on: 'bottom'
    //       },
    //       text: 'Welcome to Elysia!'
    //     }
    //   }
    // ],
    tourName: 'test',
    useModalOverlay: true
  }
]);

console.log(`🌱 Seeding complete.`);

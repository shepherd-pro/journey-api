import { faker } from '@faker-js/faker';
import { db } from './db';
import { journeys, steps } from './schema';

export const newJourneys = Array.from({ length: 10 }, (_, idx) => ({
  id: idx + 1,
  confirmCancel: faker.datatype.boolean(),
  confirmCancelMessage: faker.hacker.phrase(),
  classPrefix: faker.internet.domainWord(),
  defaultStepOptions: {
    scrollTo: faker.datatype.boolean()
  },
  exitOnEsc: faker.datatype.boolean(),
  keyboardNavigation: faker.datatype.boolean(),
  modalContainer: faker.internet.domainWord(),
  stepsContainer: faker.internet.domainWord(),
  tourName: faker.commerce.productName(),
  useModalOverlay: faker.datatype.boolean()
}));

const newSteps = Array.from({ length: 10 }, (_, idx) => {
  const journeyId = idx + 1;

  return Array.from({ length: 5 }, (_, iter) => ({
    journeyId,
    attachTo: {
      element: faker.internet.domainWord(),
      on: faker.helpers.arrayElement(['top', 'bottom', 'left', 'right'])
    },
    advanceOn: {
      selector: faker.internet.domainWord(),
      event: faker.helpers.arrayElement(['click', 'mouseover', 'mouseout'])
    },
    arrow: faker.datatype.boolean(),
    beforeShowPromise:
      'return new Promise((resolve) => setTimeout(resolve, 1000))',
    buttons: `[{
      action: 'cancel',
      classes: 'shepherd-button-secondary',
      text: 'Exit'
    }, {
      action: 'back',
      classes: 'shepherd-button-secondary',
      text: 'Back'
    }, {
      action: 'next',
      text: 'Next'
    }]`,
    cancelIcon: {
      enabled: faker.datatype.boolean(),
      label: faker.hacker.phrase()
    },
    canClickTarget: faker.datatype.boolean(),
    classes: faker.hacker.abbreviation(),
    highlightClass: faker.hacker.abbreviation(),
    modalOverlayOpeningPadding: faker.number.int(),
    modalOverlayOpeningRadius: {
      top: faker.number.int()
    },
    floatingUIOptions: {
      classes: faker.hacker.abbreviation(),
      copyStyles: faker.datatype.boolean()
    },
    scrollTo: faker.datatype.boolean(),
    scrollToHandler: '(el) => el.scrollIntoView()',
    showOn: '(el) => el.classList.contains("active")',
    text: faker.hacker.phrase(),
    title: faker.animal.type(),
    when: {
      show: '() => true',
      hide: '() => false'
    }
  }));
}).flat();

export async function seedDatabase() {
  try {
    await db.insert(journeys).values(newJourneys);
    await db.insert(steps).values(newSteps);
  } catch (error) {
    console.log(error, '😈');
  }

  console.log(`🌱 Seeding complete.`);
}

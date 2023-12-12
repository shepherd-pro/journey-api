import { sqliteTable, text, integer, blob } from 'drizzle-orm/sqlite-core';

export const journeys = sqliteTable('journeys', {
  id: integer('id').primaryKey().notNull(),
  confirmCancel: integer('id', { mode: 'boolean' }),
  confirmCancelMessage: text('confirm_cancel_message'),
  classPrefix: text('class_prefix'),
  defaultStepOptions: text('default_step_options', { mode: 'json' }),
  exitOnEsc: integer('id', { mode: 'boolean' }),
  keyboardNavigation: integer('id', { mode: 'boolean' }),
  modalContainer: blob('modal_container'),
  stepsContainer: blob('steps_container'),
  steps: text('steps', { mode: 'json' }),
  tourName: text('tour_name').notNull(),
  useModalOverlay: integer('id', { mode: 'boolean' })
});

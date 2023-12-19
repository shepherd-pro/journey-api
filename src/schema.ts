import type { InferSelectModel } from 'drizzle-orm';
import { sqliteTable, text, integer, blob } from 'drizzle-orm/sqlite-core';

export const journeys = sqliteTable('journeys', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  confirmCancel: integer('confirm_cancel', { mode: 'boolean' }),
  confirmCancelMessage: text('confirm_cancel_message'),
  classPrefix: text('class_prefix'),
  defaultStepOptions: text('default_step_options', { mode: 'json' }),
  exitOnEsc: integer('exit_on_esc', { mode: 'boolean' }),
  keyboardNavigation: integer('keyboard_navigation', { mode: 'boolean' }),
  modalContainer: text('modal_container'),
  stepsContainer: text('steps_container'),
  tourName: text('tour_name'),
  useModalOverlay: integer('use_modal_overlay', { mode: 'boolean' })
});

export type Journey = InferSelectModel<typeof journeys>;

export const steps = sqliteTable('steps', {
  id: integer('id').notNull().primaryKey(),
  journeyId: integer('journey_id').notNull()
  // attachTo: blob('attach_to', { mode: 'json' }),
  // advanceOn: blob('advance_on', { mode: 'json' }),
  // arrow: integer('arrow', { mode: 'boolean' }),
  // beforeShowPromise: text('before_show_promise'),
  // buttons: text('buttons', { mode: 'json' }),
  // cancelIcon: text('cancel_icon', { mode: 'json' }),
  // canClickTarget: integer('can_click_target', { mode: 'boolean' }),
  // classes: text('classes'),
  // highlightClass: text('highlight_class'),
  // modalOverlayOpeningPadding: integer('modal_overlay_opening_padding'),
  // modalOverlayOpeningRadius: text('modal_overlay_opening_radius', {
  //   mode: 'json'
  // }),
  // floatingUIOptions: text('floating_ui_options', { mode: 'json' }),
  // scrollTo: integer('scroll_to', { mode: 'boolean' }),
  // scrollToHandler: text('scroll_to_handler'),
  // showOn: text('show_on', { mode: 'json' }),
  // text: text('text'),
  // title: text('title'),
  // when: text('when', { mode: 'json' })
});

export type Step = InferSelectModel<typeof steps>;

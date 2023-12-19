CREATE TABLE `journeys` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`confirm_cancel` integer,
	`confirm_cancel_message` text,
	`class_prefix` text,
	`default_step_options` text,
	`exit_on_esc` integer,
	`keyboard_navigation` integer,
	`modal_container` text,
	`steps_container` text,
	`tour_name` text,
	`use_modal_overlay` integer
);
--> statement-breakpoint
CREATE TABLE `steps` (
	`id` integer PRIMARY KEY NOT NULL,
	`journey_id` integer NOT NULL
);

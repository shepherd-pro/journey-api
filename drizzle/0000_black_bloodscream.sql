CREATE TABLE `journeys` (
	`id` integer,
	`confirm_cancel_message` text,
	`class_prefix` text,
	`default_step_options` text,
	`modal_container` blob,
	`steps_container` blob,
	`steps` text,
	`tour_name` text NOT NULL
);

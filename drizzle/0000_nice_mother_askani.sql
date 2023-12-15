CREATE TABLE `journeys` (
	`id` integer,
	`confirm_cancel_message` text,
	`class_prefix` text,
	`default_step_options` blob,
	`modal_container` text,
	`steps_container` text,
	`steps` blob,
	`tour_name` text NOT NULL
);

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
	`id` text PRIMARY KEY NOT NULL,
	`journey_id` integer NOT NULL,
	`attach_to` text,
	`advance_on` text,
	`arrow` integer,
	`before_show_promise` text,
	`buttons` text,
	`cancel_icon` text,
	`can_click_target` integer,
	`classes` text,
	`highlight_class` text,
	`modal_overlay_opening_padding` integer,
	`modal_overlay_opening_radius` text,
	`floating_ui_options` text,
	`scroll_to` integer,
	`scroll_to_handler` text,
	`show_on` text,
	`text` text,
	`title` text,
	`when` text,
	FOREIGN KEY (`journey_id`) REFERENCES `journeys`(`id`) ON UPDATE no action ON DELETE no action
);

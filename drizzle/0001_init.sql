DROP TABLE `account`;--> statement-breakpoint
DROP TABLE `verification`;--> statement-breakpoint
ALTER TABLE `user` ADD `password` text NOT NULL;--> statement-breakpoint
ALTER TABLE `user` DROP COLUMN `emailVerified`;--> statement-breakpoint
ALTER TABLE `user` DROP COLUMN `image`;--> statement-breakpoint
ALTER TABLE `user` DROP COLUMN `updatedAt`;
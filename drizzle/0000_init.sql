CREATE TABLE `account` (
	`id` text PRIMARY KEY NOT NULL,
	`accountId` text NOT NULL,
	`providerId` text NOT NULL,
	`userId` text NOT NULL,
	`accessToken` text,
	`refreshToken` text,
	`idToken` text,
	`accessTokenExpiresAt` integer,
	`refreshTokenExpiresAt` integer,
	`scope` text,
	`password` text,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `additional` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`amount` real,
	`description` text,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP,
	`instituteId` integer,
	FOREIGN KEY (`instituteId`) REFERENCES `institute`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `bankOperation` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`amount` real,
	`type` text,
	`description` text,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP,
	`instituteId` integer,
	FOREIGN KEY (`instituteId`) REFERENCES `institute`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `cashierOperation` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`amount` real,
	`flux` text,
	`description` text,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP,
	`instituteId` integer,
	FOREIGN KEY (`instituteId`) REFERENCES `institute`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `charge` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`amount` real,
	`description` text,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP,
	`instituteId` integer,
	FOREIGN KEY (`instituteId`) REFERENCES `institute`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `enrollment` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`status` text,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP,
	`studentId` integer,
	`subjectId` integer,
	`professorId` integer,
	`instituteId` integer,
	FOREIGN KEY (`studentId`) REFERENCES `student`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`subjectId`) REFERENCES `subject`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`professorId`) REFERENCES `professor`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`instituteId`) REFERENCES `institute`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `institute` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`nom` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `professor` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`fullName` text NOT NULL,
	`phone` text,
	`email` text,
	`status` text,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `professorPayment` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`amount` real,
	`month` integer,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP,
	`professorId` integer,
	FOREIGN KEY (`professorId`) REFERENCES `professor`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `session` (
	`id` text PRIMARY KEY NOT NULL,
	`expiresAt` integer NOT NULL,
	`token` text NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL,
	`ipAddress` text,
	`userAgent` text,
	`userId` text NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `session_token_unique` ON `session` (`token`);--> statement-breakpoint
CREATE TABLE `student` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`fullName` text NOT NULL,
	`groupCode` text,
	`phone` text,
	`status` text,
	`registration` text,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `studentPayment` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`amount` real,
	`type` text,
	`month` integer,
	`date` text,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP,
	`enrollmentId` integer,
	FOREIGN KEY (`enrollmentId`) REFERENCES `enrollment`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `subject` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`type` text
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`emailVerified` integer NOT NULL,
	`image` text,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL,
	`role` text,
	`instituteId` integer,
	FOREIGN KEY (`instituteId`) REFERENCES `institute`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
CREATE TABLE `verification` (
	`id` text PRIMARY KEY NOT NULL,
	`identifier` text NOT NULL,
	`value` text NOT NULL,
	`expiresAt` integer NOT NULL,
	`createdAt` integer,
	`updatedAt` integer
);

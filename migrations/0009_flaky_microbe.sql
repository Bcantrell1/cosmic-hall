CREATE TABLE `user_activities` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`userId` text NOT NULL,
	`activityId` integer,
	`status` text DEFAULT 'not-started' NOT NULL,
	`timeSpent` text DEFAULT '00:00:00' NOT NULL,
	`startedAt` text,
	`completedAt` text,
	`lastAccessedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`activityId`) REFERENCES `activities`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user_answers` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`userId` text NOT NULL,
	`questionId` integer,
	`selectedOptionId` integer,
	`isCorrect` integer DEFAULT 0 NOT NULL,
	`attemptNumber` integer DEFAULT 1 NOT NULL,
	`answeredAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`questionId`) REFERENCES `questions`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`selectedOptionId`) REFERENCES `options`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user_courses` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`userId` text NOT NULL,
	`courseId` integer,
	`progress` integer DEFAULT 0 NOT NULL,
	`status` text DEFAULT 'in-progress' NOT NULL,
	`startedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`completedAt` text,
	`lastAccessedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`courseId`) REFERENCES `courses`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user_sessions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`userId` text NOT NULL,
	`sessionId` integer,
	`progress` integer DEFAULT 0 NOT NULL,
	`status` text DEFAULT 'not-started' NOT NULL,
	`startedAt` text,
	`completedAt` text,
	`lastAccessedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`sessionId`) REFERENCES `sessions`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user_units` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`userId` text NOT NULL,
	`unitId` integer,
	`progress` integer DEFAULT 0 NOT NULL,
	`status` text DEFAULT 'not-started' NOT NULL,
	`startedAt` text,
	`completedAt` text,
	`lastAccessedAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`unitId`) REFERENCES `units`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
ALTER TABLE `activities` DROP COLUMN `status`;--> statement-breakpoint
ALTER TABLE `courses` DROP COLUMN `courseProgress`;--> statement-breakpoint
ALTER TABLE `sessions` DROP COLUMN `sessionProgress`;--> statement-breakpoint
ALTER TABLE `units` DROP COLUMN `unitProgress`;--> statement-breakpoint
ALTER TABLE `units` DROP COLUMN `status`;
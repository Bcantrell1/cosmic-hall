ALTER TABLE `options` RENAME COLUMN "title" TO "option";--> statement-breakpoint
ALTER TABLE `questions` RENAME COLUMN "title" TO "question";--> statement-breakpoint
ALTER TABLE `options` ADD `correct` integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `questions` DROP COLUMN `description`;
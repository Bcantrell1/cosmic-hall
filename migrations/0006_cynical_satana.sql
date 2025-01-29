ALTER TABLE `sessions` ALTER COLUMN "title" TO "title" text NOT NULL;--> statement-breakpoint
ALTER TABLE `sessions` ALTER COLUMN "description" TO "description" text NOT NULL;--> statement-breakpoint
ALTER TABLE `sessions` ALTER COLUMN "duration" TO "duration" text NOT NULL DEFAULT '00';
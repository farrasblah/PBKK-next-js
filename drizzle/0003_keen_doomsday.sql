CREATE TABLE IF NOT EXISTS "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"icon" varchar,
	"createdBy" varchar NOT NULL
);
--> statement-breakpoint
ALTER TABLE "savings" ADD COLUMN "targetAmount" varchar NOT NULL;
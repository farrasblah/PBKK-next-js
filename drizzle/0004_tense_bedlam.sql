ALTER TABLE "savings" DROP CONSTRAINT "savings_budgetId_budgets_id_fk";
--> statement-breakpoint
ALTER TABLE "expenses" ADD COLUMN "categoryId" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "expenses" ADD CONSTRAINT "expenses_categoryId_categories_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "savings" DROP COLUMN IF EXISTS "budgetId";
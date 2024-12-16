import {
  integer,
  pgTable,
  serial,
  varchar,
  date,
} from "drizzle-orm/pg-core";

export const Budgets = pgTable("budgets", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  amount: varchar("amount").notNull(),
  icon: varchar("icon"),
  createdBy: varchar("createdBy").notNull(),
});

export const Incomes = pgTable("incomes", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  amount: varchar("amount").notNull(),
  icon: varchar("icon"),
  date: date("date").notNull(),
  createdBy: varchar("createdBy").notNull(),
});

export const Expenses = pgTable("expenses", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  amount: varchar("amount").notNull(),
  date: date("date").notNull(),
  budgetId: integer("budgetId").references(() => Budgets.id),
  categoryId: integer("categoryId").references(() => Categories.id),
  createdAt: varchar("createdAt").notNull(),
});

export const Savings = pgTable("savings", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  amount: varchar("amount").notNull(),
  targetAmount: varchar("targetAmount").notNull(),
  icon: varchar("icon"),
  targetDate: date("date").notNull(),
  createdBy: varchar("createdBy").notNull(),
});

export const Categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  icon: varchar("icon"),
  createdBy: varchar("createdBy").notNull(),
});
import { sql } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const coursesTable = sqliteTable("courses", {
    id: int().primaryKey({ autoIncrement: true }),
    title: text().notNull(),
    description: text().notNull(),
    createdAt: text().notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text().notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const unitsTable = sqliteTable("units", {
    id: int().primaryKey({ autoIncrement: true }),
    title: text().notNull(),
    description: text().notNull(),
    createdAt: text().notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text().notNull().default(sql`CURRENT_TIMESTAMP`),
    course_id: int().references(() => coursesTable.id),
});

export const sessionsTable = sqliteTable("sessions", {
    id: int().primaryKey({ autoIncrement: true }),
    title: text().notNull(),
    description: text().notNull(),
    createdAt: text().notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text().notNull().default(sql`CURRENT_TIMESTAMP`),
    duration: text().notNull().default("00"),
    unit_id: int().references(() => unitsTable.id),
});

export const activitiesTable = sqliteTable("activities", {
    id: int().primaryKey({ autoIncrement: true }),
    title: text().notNull(),
    description: text().notNull(),
    duration: text().notNull(),
    createdAt: text().notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text().notNull().default(sql`CURRENT_TIMESTAMP`),
    session_id: int().references(() => sessionsTable.id),
});

export const questionsTable = sqliteTable("questions", {
    id: int().primaryKey({ autoIncrement: true }),
    question: text().notNull(),
    createdAt: text().notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text().notNull().default(sql`CURRENT_TIMESTAMP`),
    activity_id: int().references(() => activitiesTable.id),
});

export const optionsTable = sqliteTable("options", {
    id: int().primaryKey({ autoIncrement: true }),
    option: text().notNull(),
    description: text().notNull(),
    correct: int().notNull().default(0),
    createdAt: text().notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text().notNull().default(sql`CURRENT_TIMESTAMP`),
    question_id: int().references(() => questionsTable.id),
});
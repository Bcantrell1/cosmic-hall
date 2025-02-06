import { sql } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { activitiesTable, coursesTable, optionsTable, questionsTable, sessionsTable, unitsTable } from "./courses";

export const userCoursesTable = sqliteTable("user_courses", {
    id: int().primaryKey({ autoIncrement: true }),
    userId: text().notNull(),  // Clerk user ID
    courseId: int().references(() => coursesTable.id),
    progress: int().notNull().default(0),
    status: text().notNull().default("in-progress"),
    startedAt: text().notNull().default(sql`CURRENT_TIMESTAMP`),
    completedAt: text(),
    lastAccessedAt: text().notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const userUnitsTable = sqliteTable("user_units", {
    id: int().primaryKey({ autoIncrement: true }),
    userId: text().notNull(),
    unitId: int().references(() => unitsTable.id),
    progress: int().notNull().default(0),
    status: text().notNull().default("not-started"),
    startedAt: text(),
    completedAt: text(),
    lastAccessedAt: text().notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const userSessionsTable = sqliteTable("user_sessions", {
    id: int().primaryKey({ autoIncrement: true }),
    userId: text().notNull(),
    sessionId: int().references(() => sessionsTable.id),
    progress: int().notNull().default(0),
    status: text().notNull().default("not-started"),
    startedAt: text(),
    completedAt: text(),
    lastAccessedAt: text().notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const userActivitiesTable = sqliteTable("user_activities", {
    id: int().primaryKey({ autoIncrement: true }),
    userId: text().notNull(),
    activityId: int().references(() => activitiesTable.id),
    status: text().notNull().default("not-started"),
    timeSpent: text().notNull().default("00:00:00"),
    startedAt: text(),
    completedAt: text(),
    lastAccessedAt: text().notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const userAnswersTable = sqliteTable("user_answers", {
    id: int().primaryKey({ autoIncrement: true }),
    userId: text().notNull(),
    questionId: int().references(() => questionsTable.id),
    selectedOptionId: int().references(() => optionsTable.id),
    isCorrect: int().notNull().default(0), // 0 or 1
    attemptNumber: int().notNull().default(1),
    answeredAt: text().notNull().default(sql`CURRENT_TIMESTAMP`),
});
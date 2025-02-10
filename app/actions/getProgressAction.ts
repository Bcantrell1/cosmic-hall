"use server";

import { db } from "@/db";
import { userAnswersTable, userCoursesTable, userSessionsTable, userUnitsTable } from "@/db/schema/userProgress";
import { questionsTable, unitsTable } from "@/db/schema/courses";
import { and, eq, sql } from "drizzle-orm";

export async function getCourseProgress({ userId, courseId }: { userId: string, courseId: number }) {
    try {
        const userCourse = await db.select().from(userCoursesTable).where(and(eq(userCoursesTable.userId, userId), eq(userCoursesTable.courseId, courseId)));
        return userCourse[0];
    } catch (error) {
        console.error("Error getting course progress", error);
    }
}

export async function getUnitProgress({ userId, unitId }: { userId: string, unitId: number }) {
    try {
        const userUnit = await db.select().from(userUnitsTable).where(and(eq(userUnitsTable.userId, userId), eq(userUnitsTable.unitId, unitId)));
        return userUnit[0];
    } catch (error) {
        console.error("Error getting unit progress", error);
    }
}

export async function getTotalQuestionsInUnit(unitId: number) {
    try {
        const totalQuestions = await db.select({ count: sql<number>`COUNT(*)` }).from(questionsTable).where(eq(questionsTable.unit_id, unitId));
        return totalQuestions[0]?.count;
    } catch (error) {
        console.error("Error getting total questions in unit", error);
    }
}

export async function getSessionProgress({ userId, sessionId }: { userId: string, sessionId: number }) {
    try {
        const userSession = await db.select().from(userSessionsTable).where(and(eq(userSessionsTable.userId, userId), eq(userSessionsTable.sessionId, sessionId)));
        return userSession[0];
    } catch (error) {
        console.error("Error getting session progress", error);
    }
}

export async function getUserAnswerProgressByActivityId({ userId, activityId }: { userId: string, activityId: number }) {
    try {
        const userAnswer = await db.select().from(userAnswersTable).where(and(eq(userAnswersTable.userId, userId), eq(userAnswersTable.questionId, activityId)));
        return userAnswer;
    } catch (error) {
        console.error("Error getting user answer progress by activity id", error);
    }
}

export async function getCourseIdFromUnitId(unitId: number) {
    try {
        const result = await db
            .select({
                courseId: unitsTable.course_id
            })
            .from(unitsTable)
            .where(eq(unitsTable.id, unitId));

        return result[0]?.courseId;
    } catch (error) {
        console.error("Error getting course id from unit id", error);
    }
}
"use server";

import { db } from "@/db";
import { userActivitiesTable, userAnswersTable, userCoursesTable, userSessionsTable, userUnitsTable } from "@/db/schema/userProgress";
import { and, eq } from "drizzle-orm";

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
        console.log(userUnit);
        return userUnit[0];
    } catch (error) {
        console.error("Error getting unit progress", error);
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

export async function getActivityProgress({ userId, activityId }: { userId: string, activityId: number }) {
    try {
        const userActivity = await db.select().from(userActivitiesTable).where(and(eq(userActivitiesTable.userId, userId), eq(userActivitiesTable.activityId, activityId)));
        return userActivity[0];
    } catch (error) {
        console.error("Error getting activity progress", error);
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
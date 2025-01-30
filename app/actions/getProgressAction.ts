"use server";

import { db } from "@/db";
import { userActivitiesTable, userAnswersTable, userCoursesTable, userSessionsTable, userUnitsTable } from "@/db/schema/userProgress";
import { and, eq } from "drizzle-orm";

export async function getCourseProgress({ userId, courseId }: { userId: string, courseId: number }) {
    const userCourse = await db.select().from(userCoursesTable).where(and(eq(userCoursesTable.userId, userId), eq(userCoursesTable.courseId, courseId)));
    return userCourse;
}

export async function getUnitProgress({ userId, unitId }: { userId: string, unitId: number }) {
    const userUnit = await db.select().from(userUnitsTable).where(and(eq(userUnitsTable.userId, userId), eq(userUnitsTable.unitId, unitId)));
    return userUnit;
}

export async function getSessionProgress({ userId, sessionId }: { userId: string, sessionId: number }) {
    const userSession = await db.select().from(userSessionsTable).where(and(eq(userSessionsTable.userId, userId), eq(userSessionsTable.sessionId, sessionId)));
    return userSession;
}

export async function getActivityProgress({ userId, activityId }: { userId: string, activityId: number }) {
    const userActivity = await db.select().from(userActivitiesTable).where(and(eq(userActivitiesTable.userId, userId), eq(userActivitiesTable.activityId, activityId)));
    return userActivity;
}

export async function getUserAnswerProgressByActivityId({ userId, activityId }: { userId: string, activityId: number }) {
    const userAnswer = await db.select().from(userAnswersTable).where(and(eq(userAnswersTable.userId, userId), eq(userAnswersTable.questionId, activityId)));
    return userAnswer;
}

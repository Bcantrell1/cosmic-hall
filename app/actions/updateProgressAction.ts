"use server"

import { db } from "@/db/index";
import { userActivitiesTable, userAnswersTable, userCoursesTable, userSessionsTable, userUnitsTable } from "@/db/schema/userProgress";
import { and, eq } from "drizzle-orm";

export async function updateUserCourseProgress(userId: string, courseId: number, progress: number) {
    const userCourse = await db.update(userCoursesTable).set({ progress: progress }).where(eq(userCoursesTable.userId, userId));
    return userCourse;
}

export async function updateUserUnitProgress(userId: string, unitId: number, progress: number) {
    const userUnit = await db.update(userUnitsTable).set({ progress: progress }).where(eq(userUnitsTable.userId, userId));
    return userUnit;
}

export async function updateUserSessionProgress(userId: string, sessionId: number, progress: number) {
    const userSession = await db.update(userSessionsTable).set({ progress: progress }).where(eq(userSessionsTable.userId, userId));
    return userSession;
}

export async function updateUserActivityProgress(userId: string, activityId: number, status: string) {
    const userActivity = await db.update(userActivitiesTable).set({ status: status }).where(eq(userActivitiesTable.userId, userId));
    return userActivity;
}

export async function updateUserAnswerProgress(userId: string, questionId: number, selectedOptionId: number, isCorrect: number) {
    try {
        const userAnswer = await db.update(userAnswersTable).set({ selectedOptionId: selectedOptionId, isCorrect: isCorrect }).where(and(eq(userAnswersTable.userId, userId), eq(userAnswersTable.questionId, questionId)));
        return userAnswer;
    } catch (error) {
        console.error("Error updating user answer progress", error);
    }
}
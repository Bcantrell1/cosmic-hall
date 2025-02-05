"use server"

import { db } from "@/db/index";
import { userActivitiesTable, userAnswersTable, userCoursesTable, userSessionsTable, userUnitsTable } from "@/db/schema/userProgress";
import { and, eq } from "drizzle-orm";

export async function updateUserCourseProgress(userId: string, courseId: number, progress: number) {
    try {
        await db
            .update(userCoursesTable)
            .set({ progress: progress })
            .where(
                and(
                    eq(userCoursesTable.userId, userId),
                    eq(userCoursesTable.courseId, courseId)
                )
            );
        
        // Return a plain object
        return {
            success: true,
            userId,
            courseId,
            progress
        };
    } catch (error) {
        console.error("Error updating user course progress", error);
        return {
            success: false,
            error: 'Failed to update course progress'
        };
    }
}

export async function updateUserUnitProgress(userId: string, unitId: number, progress: number) {
    try {
        const userUnit = await db.update(userUnitsTable).set({ progress: progress }).where(eq(userUnitsTable.userId, userId));
        return userUnit;
    } catch (error) {
        console.error("Error updating user unit progress", error);
    }
}

export async function updateUserSessionProgress(userId: string, sessionId: number, progress: number) {
    try {
        const userSession = await db.update(userSessionsTable).set({ progress: progress }).where(eq(userSessionsTable.userId, userId));
        return userSession;
    } catch (error) {
        console.error("Error updating user session progress", error);
    }
}

export async function updateUserActivityProgress(userId: string, activityId: number, status: string) {
    try {
        const userActivity = await db.update(userActivitiesTable).set({ status: status }).where(eq(userActivitiesTable.userId, userId));
        return userActivity;
    } catch (error) {
        console.error("Error updating user activity progress", error);
    }
}

export async function updateUserAnswerProgress(userId: string, questionId: number, selectedOptionId: number, isCorrect: number) {
    try {
        await db
            .update(userAnswersTable)
            .set({ 
                selectedOptionId: selectedOptionId, 
                isCorrect: isCorrect 
            })
            .where(
                and(
                    eq(userAnswersTable.userId, userId),
                    eq(userAnswersTable.questionId, questionId)
                )
            );
        
        // Return a plain object instead of the query result
        return {
            success: true,
            userId,
            questionId,
            selectedOptionId,
            isCorrect
        };
    } catch (error) {
        console.error("Error updating user answer progress", error);
        // Return a plain error object
        return {
            success: false,
            error: 'Failed to update answer progress'
        };
    }
}
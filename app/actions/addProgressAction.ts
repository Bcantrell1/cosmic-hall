'use server';

import { db } from "@/db";
import { userAnswersTable, userCoursesTable, userSessionsTable, userUnitsTable } from "@/db/schema/userProgress";

export async function addUserAnswerProgress(userId: string, questionId: number, optionId: number, isCorrect: number) {
    try {
        await db.insert(userAnswersTable).values({ 
            userId, 
            questionId, 
            selectedOptionId: optionId, 
            isCorrect 
        });
        
        return {
            success: true,
            userId,
            questionId,
            selectedOptionId: optionId,
            isCorrect
        };
    } catch (error) {
        console.error("Error adding user answer progress", error);
        return {
            success: false,
            error: 'Failed to add answer progress'
        };
    }
}


export async function addUserCourseProgress(userId: string, courseId: number, progress: number) {
    try {
        await db.insert(userCoursesTable).values({ userId, courseId, progress });
    } catch (error) {
        console.error("Error adding user course progress", error);
    }
}


export async function addUserUnitProgress(userId: string, unitId: number, progress: number) {
    try {
        await db.insert(userUnitsTable).values({ userId, unitId, progress });
    } catch (error) {
        console.error("Error adding user unit progress", error);
    }
}


export async function addUserSessionProgress(userId: string, sessionId: number, progress: number) {
    try {
        await db.insert(userSessionsTable).values({ userId, sessionId, progress });
    } catch (error) {
        console.error("Error adding user session progress", error);
    }
}


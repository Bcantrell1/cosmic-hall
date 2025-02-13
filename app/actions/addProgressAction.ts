'use server';

import { db } from '@/db';
import {
    userAnswersTable,
    userCoursesTable,
    userSessionsTable,
    userUnitsTable,
    userActivitiesTable,
} from '@/db/schema/userProgress';
import { sql } from 'drizzle-orm';

export async function addUserAnswerProgress(
    userId: string,
    questionId: number,
    unitId: number,
    attemptNumber: number,
    optionId: number,
    isCorrect: number
) {
    try {
        await db.insert(userAnswersTable).values({
            userId,
            questionId,
            unitId,
            attemptNumber,
            selectedOptionId: optionId,
            isCorrect,
        });

        return {
            success: true,
            userId,
            questionId,
            unitId,
            selectedOptionId: optionId,
            isCorrect,
        };
    } catch (error) {
        console.error('Error adding user answer progress', error);
        return {
            success: false,
            error: 'Failed to add answer progress',
        };
    }
}

export async function addUserCourseProgress(userId: string, courseId: number, progress: number) {
    try {
        await db.insert(userCoursesTable).values({ userId, courseId, progress });
    } catch (error) {
        console.error('Error adding user course progress', error);
    }
}

export async function addUserActivityProgress(userId: string, activityId: number) {
    try {
        await db.insert(userActivitiesTable).values({
            userId,
            activityId,
            status: 'in-progress',
            startedAt: sql`CURRENT_TIMESTAMP`,
            timeSpent: '00:00:00',
        });

        return { success: true };
    } catch (error) {
        console.error('Error adding activity progress', error);
        return { success: false, error: 'Failed to add activity progress' };
    }
}

export async function addUserSessionProgress(userId: string, sessionId: number, progress: number) {
    try {
        await db.insert(userSessionsTable).values({
            userId,
            sessionId,
            progress,
            status: 'in-progress',
            startedAt: sql`CURRENT_TIMESTAMP`,
        });
    } catch (error) {
        console.error('Error adding session progress', error);
    }
}

export async function addUserUnitProgress(userId: string, unitId: number, progress: number) {
    try {
        await db.insert(userUnitsTable).values({
            userId,
            unitId,
            progress,
            status: 'in-progress',
            startedAt: sql`CURRENT_TIMESTAMP`,
        });
    } catch (error) {
        console.error('Error adding unit progress', error);
    }
}

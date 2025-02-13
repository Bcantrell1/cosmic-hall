'use server';

import { db } from '@/db/index';
import {
    userAnswersTable,
    userCoursesTable,
    userUnitsTable,
    userActivitiesTable,
    userSessionsTable,
} from '@/db/schema/userProgress';
import { and, eq, sql } from 'drizzle-orm';

import { getCourseIdFromUnitId, getTotalQuestionsInUnit } from './getProgressAction';
import { activitiesTable, unitsTable } from '@/db/schema/courses';

export async function updateUserCourseProgress(userId: string, courseId: number) {
    try {
        const units = await db.select().from(unitsTable).where(eq(unitsTable.course_id, courseId));

        let totalProgress = 0;
        for (const unit of units) {
            const unitProgress = await db
                .select()
                .from(userUnitsTable)
                .where(and(eq(userUnitsTable.userId, userId), eq(userUnitsTable.unitId, unit.id)));
            totalProgress += unitProgress[0]?.progress || 0;
        }

        const courseProgress = Math.round(totalProgress / units.length);
        const status = courseProgress === 100 ? 'completed' : 'in-progress';

        await db
            .update(userCoursesTable)
            .set({
                progress: courseProgress,
                status,
                completedAt: status === 'completed' ? sql`CURRENT_TIMESTAMP` : null,
                lastAccessedAt: sql`CURRENT_TIMESTAMP`,
            })
            .where(
                and(eq(userCoursesTable.userId, userId), eq(userCoursesTable.courseId, courseId))
            );

        return courseProgress;
    } catch (error) {
        console.error('Error updating course progress', error);
        return 0;
    }
}

export async function updateUserUnitProgress(userId: string, unitId: number) {
    try {
        const totalAnsweredQuestions = await db
            .select({ count: sql<number>`COUNT(*)` })
            .from(userAnswersTable)
            .where(
                and(
                    eq(userAnswersTable.userId, userId),
                    eq(userAnswersTable.isCorrect, 1),
                    eq(userAnswersTable.unitId, unitId)
                )
            );

        const totalQuestions = await getTotalQuestionsInUnit(unitId);
        const progress = Math.round(
            ((totalAnsweredQuestions[0]?.count || 0) / (totalQuestions || 0)) * 100
        );
        const status =
            progress === 100 ? 'completed' : progress > 0 ? 'in-progress' : 'not-started';

        await db
            .update(userUnitsTable)
            .set({
                progress,
                status,
                completedAt: status === 'completed' ? sql`CURRENT_TIMESTAMP` : null,
                lastAccessedAt: sql`CURRENT_TIMESTAMP`,
            })
            .where(and(eq(userUnitsTable.userId, userId), eq(userUnitsTable.unitId, unitId)));

        const courseId = await getCourseIdFromUnitId(unitId);
        if (courseId) {
            await updateUserCourseProgress(userId, courseId);
        }

        return progress;
    } catch (error) {
        console.error('Error updating unit progress', error);
        return 0;
    }
}

async function getSessionIdFromActivityId(activityId: number) {
    try {
        const activity = await db
            .select()
            .from(activitiesTable)
            .where(eq(activitiesTable.id, activityId))
            .then((rows) => rows[0]);
        return activity?.session_id;
    } catch (error) {
        console.error('Error getting session id', error);
        return null;
    }
}

export async function updateUserActivityProgress(
    userId: string,
    activityId: number,
    status: 'completed' | 'in-progress' | 'not-started',
    timeSpent: string
) {
    try {
        await db
            .update(userActivitiesTable)
            .set({
                status,
                timeSpent,
                completedAt: status === 'completed' ? sql`CURRENT_TIMESTAMP` : null,
                lastAccessedAt: sql`CURRENT_TIMESTAMP`,
            })
            .where(
                and(
                    eq(userActivitiesTable.userId, userId),
                    eq(userActivitiesTable.activityId, activityId)
                )
            );

        if (status === 'completed') {
            const sessionId = await getSessionIdFromActivityId(activityId);
            if (sessionId) {
                await updateUserSessionProgress(userId, sessionId);
            }
        }

        return { success: true };
    } catch (error) {
        console.error('Error updating activity progress', error);
        return { success: false, error: 'Failed to update activity progress' };
    }
}

export async function updateUserAnswerProgress(
    userId: string,
    questionId: number,
    attemptNumber: number,
    selectedOptionId: number,
    isCorrect: number
) {
    try {
        await db
            .update(userAnswersTable)
            .set({
                selectedOptionId,
                isCorrect,
                attemptNumber,
                answeredAt: sql`CURRENT_TIMESTAMP`,
            })
            .where(
                and(
                    eq(userAnswersTable.userId, userId),
                    eq(userAnswersTable.questionId, questionId)
                )
            );

        return {
            success: true,
            userId,
            questionId,
            selectedOptionId,
            attemptNumber,
            isCorrect,
        };
    } catch (error) {
        console.error('Error updating user answer progress', error);
        return {
            success: false,
            error: 'Failed to update answer progress',
        };
    }
}

export async function updateUserSessionProgress(userId: string, sessionId: number) {
    try {
        const activities = await db
            .select()
            .from(activitiesTable)
            .where(eq(activitiesTable.session_id, sessionId));

        let completedActivities = 0;
        for (const activity of activities) {
            const activityProgress = await db
                .select()
                .from(userActivitiesTable)
                .where(
                    and(
                        eq(userActivitiesTable.userId, userId),
                        eq(userActivitiesTable.activityId, activity.id),
                        eq(userActivitiesTable.status, 'completed')
                    )
                );
            if (activityProgress.length > 0) {
                completedActivities++;
            }
        }

        const progress = Math.round((completedActivities / activities.length) * 100);
        const status =
            progress === 100 ? 'completed' : progress > 0 ? 'in-progress' : 'not-started';

        await db
            .update(userSessionsTable)
            .set({
                progress,
                status,
                completedAt: status === 'completed' ? sql`CURRENT_TIMESTAMP` : null,
                lastAccessedAt: sql`CURRENT_TIMESTAMP`,
            })
            .where(
                and(
                    eq(userSessionsTable.userId, userId),
                    eq(userSessionsTable.sessionId, sessionId)
                )
            );

        return { success: true, progress };
    } catch (error) {
        console.error('Error updating session progress', error);
        return { success: false };
    }
}

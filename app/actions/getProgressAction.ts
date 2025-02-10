"use server";

import { db } from "@/db";
import { userActivitiesTable, userAnswersTable, userCoursesTable, userSessionsTable, userUnitsTable } from "@/db/schema/userProgress";
import { activitiesTable, questionsTable, sessionsTable, unitsTable } from "@/db/schema/courses";
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
        console.log(userUnit);
        return userUnit[0];
    } catch (error) {
        console.error("Error getting unit progress", error);
    }
}

// I need to update this to get the total number of questions in a specific unit
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

export async function getActivityIdFromQuestionId(questionId: number) {
    try {
        const result = await db
            .select({
                activityId: questionsTable.activity_id
            })
            .from(questionsTable)
            .where(eq(questionsTable.id, questionId));

        return result[0]?.activityId;
    } catch (error) {
        console.error("Error getting activity id from question id", error);
    }
}

export async function getSessionIdFromActivityId(activityId: number) {
    try {
        const result = await db
            .select({
                sessionId: activitiesTable.session_id
            })
            .from(activitiesTable)
            .where(eq(activitiesTable.id, activityId));

        return result[0]?.sessionId;
    } catch (error) {
        console.error("Error getting session id from activity id", error);
    }
}

export async function getUnitIdFromSessionId(sessionId: number) {
    try {
        const result = await db
            .select({
                unitId: sessionsTable.unit_id
            })
            .from(sessionsTable)
            .where(eq(sessionsTable.id, sessionId));

        return result[0]?.unitId;
    } catch (error) {
        console.error("Error getting unit id from session id", error);
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

export async function calculateActivityProgress(userId: string, activityId: number) {
    try {
        // Get total questions and completed questions for the activity
        const result = await db
            .select({
                total: sql`COUNT(*)`,
                completed: sql`COUNT(CASE WHEN ${userAnswersTable.isCorrect} = 1 THEN 1 END)`
            })
            .from(questionsTable)
            .leftJoin(
                userAnswersTable,
                and(
                    eq(userAnswersTable.questionId, questionsTable.id),
                    eq(userAnswersTable.userId, userId)
                )
            )
            .where(eq(questionsTable.activity_id, activityId))
            .groupBy(questionsTable.activity_id);

        console.log("Activity Progress result: ", result);
        if (result[0]) {
            const { total, completed } = result[0];
            // Update activity status if all questions are completed
            if (completed === total) {
                console.log("Activity completed");
                console.log("attempting to update activity status");
                const activityStatus = await db
                    .update(userActivitiesTable)
                    .set({ 
                        status: "completed",
                        completedAt: sql`CURRENT_TIMESTAMP`
                    })
                    .where(
                        and(
                            eq(userActivitiesTable.userId, userId),
                            eq(userActivitiesTable.activityId, activityId)
                        )
                    );
                if (activityStatus) {
                    console.log("activity status updated");
                } else {
                    console.log("activity status not updated");
                }
            }
            const totalNum = Number(total);
            const completedNum = Number(completed);
            return totalNum > 0 ? (completedNum / totalNum) * 100 : 0;
        }
        return 0;
    } catch (error) {
        console.error("Error calculating activity progress", error);
        return 0;
    }
}

export async function calculateSessionProgress(userId: string, sessionId: number) {
    try {
        const result = await db
            .select({
                total: sql`COUNT(*)`,
                completed: sql`COUNT(CASE WHEN ${userSessionsTable.status} = 'completed' THEN 1 END)`
            })
            .from(sessionsTable)
            .leftJoin(
                userSessionsTable,
                and(
                    eq(userSessionsTable.sessionId, sessionsTable.id),
                    eq(userSessionsTable.userId, userId)
                )
            )
            .where(eq(sessionsTable.id, sessionId))
            .groupBy(sessionsTable.id);
        console.log("Session Progress result: ", result);


        if (result[0]) {
            const { total, completed } = result[0];
            const totalNum = Number(total);
            const completedNum = Number(completed);
            const progress = totalNum > 0 ? (completedNum / totalNum) * 100 : 0;
            
            // Update session status if all activities are completed
            if (completed === total) {
                await db
                    .update(userSessionsTable)
                    .set({ 
                        status: "completed",
                        completedAt: sql`CURRENT_TIMESTAMP`,
                        progress: progress
                    })
                    .where(
                        and(
                            eq(userSessionsTable.userId, userId),
                            eq(userSessionsTable.sessionId, sessionId)
                        )
                    );
            }
            return progress;
        }
        return 0;
    } catch (error) {
        console.error("Error calculating session progress", error);
        return 0;
    }
}

export async function calculateUnitProgress(userId: string, unitId: number) {
    try {
        const result = await db
            .select({
                total: sql`COUNT(DISTINCT ${sessionsTable.id})`,
                completed: sql`COUNT(DISTINCT CASE WHEN ${userSessionsTable.status} = 'completed' THEN ${sessionsTable.id} END)`
            })
            .from(sessionsTable)
            .leftJoin(
                userSessionsTable,
                and(
                    eq(userSessionsTable.sessionId, sessionsTable.id),
                    eq(userSessionsTable.userId, userId)
                )
            )
            .where(eq(sessionsTable.unit_id, unitId))
            .groupBy(sessionsTable.unit_id);
        console.log("Unit Progress result: ", result);

        if (result[0]) {
            const { total, completed } = result[0];
            const totalNum = Number(total);
            const completedNum = Number(completed);
            const progress = totalNum > 0 ? (completedNum / totalNum) * 100 : 0;
            

            // Update unit status if all sessions are completed
            if (completed === total) {
                await db
                    .update(userUnitsTable)
                    .set({ 
                        status: "completed",
                        completedAt: sql`CURRENT_TIMESTAMP`,
                        progress: progress
                    })
                    .where(
                        and(
                            eq(userUnitsTable.userId, userId),
                            eq(userUnitsTable.unitId, unitId)
                        )
                    );
            }
            return progress;
        }
        return 0;
    } catch (error) {
        console.error("Error calculating unit progress", error);
        return 0;
    }
}

export async function calculateCourseProgress(userId: string, courseId: number) {
    try {
        const result = await db
            .select({
                total: sql`COUNT(DISTINCT ${unitsTable.id})`,
                completed: sql`COUNT(DISTINCT CASE WHEN ${userUnitsTable.status} = 'completed' THEN ${unitsTable.id} END)`
            })
            .from(unitsTable)
            .leftJoin(
                userUnitsTable,
                and(
                    eq(userUnitsTable.unitId, unitsTable.id),
                    eq(userUnitsTable.userId, userId)
                )
            )
            .where(eq(unitsTable.course_id, courseId))
            .groupBy(unitsTable.course_id);
        console.log("Course Progress result: ", result);

        if (result[0]) {
            const { total, completed } = result[0];
            const totalNum = Number(total);
            const completedNum = Number(completed);
            const progress = totalNum > 0 ? (completedNum / totalNum) * 100 : 0;
            

            // Update course status if all units are completed
            if (completed === total) {
                await db
                    .update(userCoursesTable)
                    .set({ 
                        status: "completed",
                        completedAt: sql`CURRENT_TIMESTAMP`,
                        progress: progress
                    })
                    .where(
                        and(
                            eq(userCoursesTable.userId, userId),
                            eq(userCoursesTable.courseId, courseId)
                        )
                    );
            }
            return progress;
        }
        return 0;
    } catch (error) {
        console.error("Error calculating course progress", error);
        return 0;
    }
}
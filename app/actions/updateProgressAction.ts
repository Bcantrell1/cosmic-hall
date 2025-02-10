"use server"

import { db } from "@/db/index";
import { userActivitiesTable,  userAnswersTable, userCoursesTable, userSessionsTable, userUnitsTable } from "@/db/schema/userProgress";
import { and, eq, sql } from "drizzle-orm";

import { 
    getActivityIdFromQuestionId, 
    getSessionIdFromActivityId, 
    getUnitIdFromSessionId, 
    getCourseIdFromUnitId,
    calculateActivityProgress,
    calculateSessionProgress,
    calculateUnitProgress,
    calculateCourseProgress,
    getTotalQuestionsInUnit
} from "./getProgressAction";
import { questionsTable, sessionsTable, unitsTable } from "@/db/schema/courses";


export async function updateUserCourseProgress(userId: string, courseId: number) {
    try {
        const units = await db
            .select()
            .from(unitsTable)
            .where(eq(unitsTable.course_id, courseId));
        console.log("units", units);

        // Calculate average progress across all units
        let totalProgress = 0;
        for (const unit of units) {
            const unitProgress = await db
                .select()
                .from(userUnitsTable)
                .where(
                    and(
                        eq(userUnitsTable.userId, userId),
                        eq(userUnitsTable.unitId, unit.id)
                    )
                );
            totalProgress += unitProgress[0]?.progress || 0;
        }

        const courseProgress = Math.round(totalProgress / units.length);

        // Update course progress
        await db
            .update(userCoursesTable)
            .set({ progress: courseProgress })
            .where(
                and(
                    eq(userCoursesTable.userId, userId),
                    eq(userCoursesTable.courseId, courseId)
                )
            );

        return courseProgress;
    } catch (error) {
        console.error("Error updating course progress", error);
        return 0;
    }
}

export async function updateUserUnitProgress(userId: string, unitId: number) {
    try {
        // get only the answered questions in this unit
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
        console.log("totalAnsweredQuestions", totalAnsweredQuestions);


        // compare the total answered questions to the total number of questions in this unit
        const totalQuestions = await getTotalQuestionsInUnit(unitId);
        console.log("totalQuestions", totalQuestions);

        const progress = Math.round((totalAnsweredQuestions[0]?.count || 0) / (totalQuestions || 0) * 100);
        console.log("progress", progress);

        // Update unit progress
        await db
            .update(userUnitsTable)
            .set({ progress: progress })
            .where(
                and(
                    eq(userUnitsTable.userId, userId),
                    eq(userUnitsTable.unitId, unitId)
                )
            );

        // Update course progress
        const courseId = await getCourseIdFromUnitId(unitId);
        if (courseId) {
            await updateUserCourseProgress(userId, courseId);
        }

        return progress;
    } catch (error) {
        console.error("Error updating unit progress", error);
        return 0;
    }
}

export async function updateUserAnswerProgress(userId: string, questionId: number, attemptNumber: number, selectedOptionId: number, isCorrect: number) {
    try {
        // Update the answer first
        await db
            .update(userAnswersTable)
            .set({ 
                selectedOptionId: selectedOptionId, 
                isCorrect: isCorrect,
                attemptNumber: attemptNumber
            })
            .where(
                and(
                    eq(userAnswersTable.userId, userId),
                    eq(userAnswersTable.questionId, questionId),
                )
            );
        
        // Get activityId and update activity progress
        // const activityId = await getActivityIdFromQuestionId(questionId);
        // if (activityId) {
        //     await updateUserActivityProgress(userId, activityId);
        // }

        return {
            success: true,
            userId,
            questionId,
            selectedOptionId,
            attemptNumber,
            isCorrect
        };
    } catch (error) {
        console.error("Error updating user answer progress", error);
        return {
            success: false,
            error: 'Failed to update answer progress'
        };
    }
}
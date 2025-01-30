"use server"

import { db } from "@/db";
import { questionsTable } from "@/db/schema/courses";
import { eq } from "drizzle-orm";

const questionsCache: Record<number, any[]> = {};

export async function getQuestions(activityId: number) {
    if (questionsCache[activityId]) {
        return questionsCache[activityId];
    }
    const questions = await db.select().from(questionsTable).where(eq(questionsTable.activity_id, activityId));
    questionsCache[activityId] = questions;
    return questions;
}
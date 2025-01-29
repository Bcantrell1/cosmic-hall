"use server"

import { db } from "@/db";
import { questionsTable } from "@/db/schema/courses";
import { eq } from "drizzle-orm";

export async function getQuestions(activityId: number) {
    const questions = await db.select().from(questionsTable).where(eq(questionsTable.activity_id, activityId));
    return questions;
}
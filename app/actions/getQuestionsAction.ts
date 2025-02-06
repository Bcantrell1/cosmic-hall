"use server"

import { db } from "@/db";
import { questionsTable } from "@/db/schema/courses";
import { eq } from "drizzle-orm";
import { Questions } from "../lib/data";

const questionsCache: Record<number, Questions[]> = {};

export async function getQuestions(activityId: number) {
    if (questionsCache[activityId]) {
        return questionsCache[activityId];
    }
    try {   
        const questions = await db.select().from(questionsTable).where(eq(questionsTable.activity_id, activityId));
        questionsCache[activityId] = questions;
        return {
            success: true,
            questions
        };
    } catch (error) {
        console.error("Error getting questions", error);
        return {
            success: false,
            error: "Error getting questions"
        };
    }

}
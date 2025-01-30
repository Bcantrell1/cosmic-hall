"use server"

import { db } from "@/db";
import { optionsTable } from "@/db/schema/courses";
import { eq } from "drizzle-orm";

const optionsCache: Record<number, any[]> = {};

export async function getOptions(questionId: number) {
    if (optionsCache[questionId]) {
        return optionsCache[questionId];
    }
    const options = await db.select().from(optionsTable).where(eq(optionsTable.question_id, questionId));
    optionsCache[questionId] = options;
    return options;
}
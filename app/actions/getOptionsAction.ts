"use server"

import { db } from "@/db";
import { optionsTable } from "@/db/schema/courses";
import { eq } from "drizzle-orm";

export async function getOptions(questionId: number) {
    const options = await db.select().from(optionsTable).where(eq(optionsTable.question_id, questionId));
    return options;
}
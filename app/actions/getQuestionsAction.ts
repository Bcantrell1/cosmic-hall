"use server"

import { db } from "@/db";
import { questionsTable } from "@/db/schema/courses";
import { eq } from "drizzle-orm";

export async function getQuestions(activityId: number) {
	try {   
			const questions = await db.select().from(questionsTable).where(eq(questionsTable.activity_id, activityId));
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
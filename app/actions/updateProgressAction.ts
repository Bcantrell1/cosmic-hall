"use server"

import { db } from "@/db/index";
import { coursesTable, sessionsTable, unitsTable } from "@/db/schema/courses";
import { eq } from "drizzle-orm";

export async function updateCourseProgress(courseId: number, progress: number) {
    const course = await db.update(coursesTable).set({ courseProgress: progress }).where(eq(coursesTable.id, courseId));
    return course;
}

export async function updateUnitProgress(unitId: number, progress: number) {
    const unit = await db.update(unitsTable).set({ unitProgress: progress }).where(eq(unitsTable.id, unitId));
    return unit;
}

export async function updateSessionProgress(sessionId: number, progress: number) {
    const session = await db.update(sessionsTable).set({ sessionProgress: progress }).where(eq(sessionsTable.id, sessionId));
    return session;
}
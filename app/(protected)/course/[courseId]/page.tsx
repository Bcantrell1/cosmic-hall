import { CourseViewer } from "@/app/ui/course/CourseViewer";
import { db } from "@/db";
import { coursesTable, sessionsTable, unitsTable } from "@/db/schema/courses";
import { Button } from "@headlessui/react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { userSessionsTable, userUnitsTable } from "@/db/schema/userProgress";

export default async function CoursePage({
	params
}: {
	params: Promise<{ courseId: string }>
}) {
	const userId = (await auth()).userId;
	const { courseId } = await params;
	const course = await db.select().from(coursesTable).where(eq(coursesTable.id, Number(courseId)));
	const units = await db.select().from(unitsTable).where(eq(unitsTable.course_id, Number(courseId)));
	const sessions = await db.select().from(sessionsTable).where(eq(sessionsTable.unit_id, Number(courseId)));

	if (!course && !units && !sessions) {
		notFound();
	}
	
	if (!userId) {
		notFound();
	}

	const unitProgress = await db.select().from(userUnitsTable).where(eq(userUnitsTable.userId, userId));
	const sessionProgress = await db.select().from(userSessionsTable).where(eq(userSessionsTable.userId, userId));

	return (
		<div className="container mx-auto p-6">
			<Button as={Link} href={`/courses`}>Back to Courses</Button>
			<CourseViewer course={course[0]} units={units} sessions={sessions} unitProgress={unitProgress} sessionProgress={sessionProgress} />
		</div>
	);
}
import { CourseViewer } from "@/app/ui/course/CourseViewer";
import { db } from "@/db";
import { coursesTable, sessionsTable, unitsTable } from "@/db/schema/courses";
import { Button } from "@headlessui/react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";

export default async function CoursePage({
	params
}: {
	params: Promise<{ courseId: string }>
}) {
	const { courseId } = await params;
	const course = await db.select().from(coursesTable).where(eq(coursesTable.id, Number(courseId)));
	const units = await db.select().from(unitsTable).where(eq(unitsTable.course_id, Number(courseId)));
	const sessions = await db.select().from(sessionsTable).where(eq(sessionsTable.unit_id, Number(courseId)));

	if (!course && !units && !sessions) {
		notFound();
	}

	return (
		<div className="container mx-auto p-6">
			<Button as={Link} href={`/courses`}>Back to Courses</Button>
			<CourseViewer course={course[0]} units={units} sessions={sessions} />
		</div>
	);
}
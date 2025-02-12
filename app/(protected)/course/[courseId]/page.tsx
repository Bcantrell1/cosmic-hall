import { CourseViewer } from "@/app/ui/course/CourseViewer";
import { db } from "@/db";
import { coursesTable, sessionsTable, unitsTable } from "@/db/schema/courses";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { userSessionsTable, userUnitsTable } from "@/db/schema/userProgress";
import { Breadcrumbs } from "@/app/ui/common/Breadcrumbs";

export default async function CoursePage({
	params
}: {
	params: Promise<{ courseId: string }>
}) {
	const userId = (await auth()).userId;

	if (!userId) {
        notFound();
    }

	const { courseId } = await params;

	const [course, units, sessions, unitProgress, sessionProgress] = await Promise.all([
		db
			.select()
			.from(coursesTable)
			.where(eq(coursesTable.id, Number(courseId)))
			.then(rows => rows[0]),
		db
			.select()
			.from(unitsTable)
			.where(eq(unitsTable.course_id, Number(courseId))),
		db
			.select()
			.from(sessionsTable),
		db
			.select()
			.from(userUnitsTable)
			.where(eq(userUnitsTable.userId, userId)),
		db
			.select()
			.from(userSessionsTable)
			.where(eq(userSessionsTable.userId, userId))
	]);

	if (!course) {
        notFound();
    }

	return (
		<div className="container mx-auto p-6">
			<Breadcrumbs
				items={[
					{ label: 'Courses', href: '/courses' },
					{ label: course.title, href: `/course/${courseId}` },
				]}
			/>
			<CourseViewer course={course} userId={userId} units={units} sessions={sessions} unitProgress={unitProgress} sessionProgress={sessionProgress} />
		</div>
	);
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ courseId: string }>;
}) {
	const { courseId } = await params;

	const [course] = await db
		.select()
		.from(coursesTable)
		.where(eq(coursesTable.id, Number(courseId)));

	return {
		title: course ? `${course.title} | Cosmic Hall` : 'Course | Cosmic Hall',
		description: course?.description || 'Learn about the cosmos',
	};
}
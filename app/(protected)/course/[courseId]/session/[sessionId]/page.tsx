import { SessionViewer } from '@/app/ui/session/SessionViewer';
import { db } from '@/db';
import { activitiesTable, coursesTable, sessionsTable } from '@/db/schema/courses';
import { notFound } from 'next/navigation';
import { eq } from 'drizzle-orm';
import { auth } from '@clerk/nextjs/server';
import { Breadcrumbs } from '@/app/ui/common/Breadcrumbs';

export default async function SessionPage({
	params
}: {
	params: Promise<{ courseId: string; sessionId: string; }>
}) {
	const userId = (await auth()).userId;

	if (!userId) {
		notFound();
	}

	const { courseId, sessionId } = await params;
	const [session] = await db
        .select()
        .from(sessionsTable)
        .where(eq(sessionsTable.id, Number(sessionId)));

	if (!session) {
        notFound();
    }

	const activities = await db
        .select()
        .from(activitiesTable)
        .where(eq(activitiesTable.session_id, Number(sessionId)));

	const [course] = await db
		.select()
		.from(coursesTable)
		.where(eq(coursesTable.id, Number(courseId)));

	if (!course) {
		notFound();
	}

	return (
		<div className="container mx-auto p-6">
			<Breadcrumbs
				items={[
					{ label: 'Courses', href: '/courses' },
					{ label: course.title, href: `/course/${courseId}` },
					{ label: session.title, href: `/course/${courseId}/session/${sessionId}` },
				]}
			/>
			<SessionViewer session={session} activities={activities} userId={userId} />
		</div>

	);
}
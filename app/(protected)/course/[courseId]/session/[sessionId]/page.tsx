import { SessionViewer } from '@/app/ui/session/SessionViewer';
import { db } from '@/db';
import { activitiesTable, sessionsTable } from '@/db/schema/courses';
import { Button } from '@headlessui/react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { eq } from 'drizzle-orm';
import { auth } from '@clerk/nextjs/server';

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

	return (
		<div className="container mx-auto p-6">
			<Button as={Link} href={`/course/${courseId}`}>Back to Course</Button>
			<SessionViewer session={session} activities={activities} userId={userId} />
		</div>

	);
}
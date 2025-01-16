import { getSession } from '@/app/lib/data';
import { SessionViewer } from '@/app/ui/session/SessionViewer';
import { Button } from '@headlessui/react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function SessionPage({ 
  params 
}: { 
  params: Promise<{ courseId: string; sessionId: string }>
}) {
	const {courseId, sessionId} = await params;
  const session = await getSession(courseId, sessionId);
  
  if (!session) {
    notFound();
  }

  return (
    <div className="container mx-auto p-6">
			<Button as={Link} href={`/course/${courseId}`}>Back to Course</Button>
      <SessionViewer {...session} />
    </div>
  );
}
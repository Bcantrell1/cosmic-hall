import { getCourseProgress } from '@/app/actions/getProgressAction';
import { db } from '@/db/index';
import { coursesTable } from '@/db/schema/courses';
import { auth } from '@clerk/nextjs/server';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import Loading from './loading';
import CourseList from '@/app/ui/course/components/CourseList';

export const metadata = {
    title: 'Courses | Cosmic Hall',
    description: 'Browse available courses in Cosmic Hall.',
};

export default async function CoursesPage() {
    const userId = (await auth()).userId;

    if (!userId) {
        notFound();
    }

    const allCourses = await db.select().from(coursesTable).all();
    const coursesWithProgress = await Promise.all(
        allCourses.map(async (course) => {
            const progress = await getCourseProgress({ userId, courseId: course.id });
            return { ...course, progress };
        })
    );

    return (
        <div className="container mx-auto p-4">
            <div className="p-2 mb-3">
                <h2 className="text-xl">Course Select</h2>
            </div>
            <Suspense fallback={<Loading />}>
                <CourseList userId={userId} initialCourses={coursesWithProgress.map(course => ({
                    ...course,
                    progress: course.progress || {
                        id: 0,
                        userId: userId,
                        courseId: course.id,
                        progress: 0,
                        status: 'NOT_STARTED',
                        startedAt: new Date().toISOString(),
                        completedAt: null,
                        lastAccessedAt: new Date().toISOString()
                    }
                }))} />
            </Suspense>
        </div>
    );
}

import { getCourseProgress } from "@/app/actions/getProgressAction";
import { CourseCard } from "@/app/ui/course/CourseCard";
import { db } from "@/db/index";
import { coursesTable } from "@/db/schema/courses";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Loading from "./loading";

export const metadata = {
	title: 'Courses | Cosmic Hall',
	description: 'Browse available courses in Cosmic Hall.',
};

async function CourseList({ userId }: { userId: string }) {
	const allCourses = await db.select().from(coursesTable).all();
	
	const coursesWithProgress = await Promise.all(
		allCourses.map(async (course) => {
			const progress = await getCourseProgress({ userId, courseId: course.id });
			return { ...course, progress };
		})
	);

	return (
		<section className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(350px,1fr))] place-items-center">
			{coursesWithProgress.map((course) => (
				<CourseCard 
					key={course.id} 
					{...course} 
					progress={course.progress} 
					userId={userId} 
				/>
			))}
		</section>
	);
}

export default async function CoursesPage() {
	const userId = (await auth()).userId;

	if (!userId) {
		notFound();
	}

	return (
		<div className="container mx-auto p-4">
			<div className="p-2 mb-3">
				<h2 className="text-xl">Course Select</h2>
			</div>
			<Suspense fallback={<Loading />}>
				<CourseList userId={userId} />
			</Suspense>
		</div>
	);
}
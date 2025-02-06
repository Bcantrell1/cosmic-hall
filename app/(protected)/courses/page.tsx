import { getCourseProgress } from "@/app/actions/getProgressAction";
import { CourseCard } from "@/app/ui/course/CourseCard";
import { db } from "@/db/index";
import { coursesTable } from "@/db/schema/courses";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

export default async function CoursesPage() {
	const allCourses = await db.select().from(coursesTable).all();
	const userId = (await auth()).userId;

	if (!userId) {
		notFound();
	}

	return (
		<div className="container mx-auto p-4">
			<div className="p-2 mb-3">
				<h2 className="text-xl">Course Select</h2>
			</div>
			<section className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(350px,1fr))] place-items-center">
				{allCourses.map(async (course) => {
					const progress = await getCourseProgress({ userId: userId, courseId: course.id });
					return (
						<CourseCard key={course.id} {...course} progress={progress} userId={userId} />
					)
				}
			)}
			</section>
		</div>
	)
}
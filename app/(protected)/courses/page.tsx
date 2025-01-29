import { mockCourses } from "@/app/lib/dummy";
import { CourseCard } from "@/app/ui/course/CourseCard";
import CourseForm from "@/app/ui/course/CourseForm";
import { db } from "@/db/index";
import { coursesTable } from "@/db/schema/courses";

export default async function CoursesPage() {
	const allCourses = await db.select().from(coursesTable).all();
	return (
		<div className="container mx-auto p-4">
			<div className="p-2 mb-3">
				<h2 className="text-xl">Course Select</h2>
			</div>
			<section className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(350px,1fr))] place-items-center">
				{allCourses.map((course) => (
					<CourseCard key={course.id} {...course} />
				))}

			</section>
			<br />
			<hr />
			<br />
			<h2 className="text-xl">Add Course</h2>
			<CourseForm />
		</div>
	)
}
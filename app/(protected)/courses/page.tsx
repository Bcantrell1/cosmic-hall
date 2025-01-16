import { mockCourses } from "@/app/lib/dummy";
import { CourseCard } from "@/app/ui/course/CourseCard";

export default function CoursesPage() {
	return (
		<div className="container mx-auto p-4">
			<div className="p-2 mb-3">
				<h2 className="text-xl">Course Select</h2>
			</div>
			<section className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(350px,1fr))] place-items-center">
				{mockCourses.map((course) => (
					<CourseCard key={course.id} {...course} />
				))}
			</section>
		</div>
	)
}
import { getCourse } from "@/app/lib/data";
import { CourseViewer } from "@/app/ui/course/CourseViewer";
import { Button } from "@headlessui/react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function CoursePage({ 
  params 
}: { 
  params: { courseId: string } 
}) {
	const {courseId} = await params;
  const course = await getCourse(courseId);
  
  if (!course) {
    notFound();
  }

  return (
    <div className="container mx-auto p-6">
			<Button as={Link} href={`/courses`}>Back To Courses</Button>
      <CourseViewer {...course} />
    </div>
  );
}
'use client';
import { addUserCourseProgress } from "@/app/actions/addProgressAction";
import { Course, UserCourse } from "@/app/lib/data";
import { Button } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";

type CourseCardProps = Course & {
	progress?: UserCourse;
	userId: string;
}

export const CourseCard: React.FC<CourseCardProps> = ({
	id,
	title,
	description,
	progress,
	userId
}) => {
	const buttonText = (progress: number) => {
		if (progress == 100) return "Completed";
		if (progress == 0) return "Start Course";
		return "Continue";
	}

	const handleCourseStart = async () => {
		if (progress?.progress == 0 || progress?.progress == null) {
			await addUserCourseProgress(userId, id, 1);
		}
	}


	return (

		<div className="w-[350px] p-6 bg-indigo-800 text-white rounded-lg shadow-lg flex flex-col">
			<Image src={'https://placehold.co/350x200/png'} className="rounded pb-2" width={350} height={200} priority={true} alt="" />
			<div className="flex items-center gap-2 mb-4">
				<h3 className="text-xl font-semibold">{title}</h3>
			</div>

			<div className="space-y-2 mb-4">
				<p className="text-sm">{description}</p>
			</div>

			<div className="space-y-2 mb-6">
				<div className="w-full h-2 bg-gray-200 rounded-full mt-2">
					<div
						className="h-2 bg-green-500 rounded-full"
						style={{ width: `${progress ? ((progress?.progress / 100) * 100) : 0}%` }}
					/>
				</div>
			</div>

			<div className="mt-auto flex gap-4">
				<Button 
					as={Link} 
					href={`/course/${id}`} 
					className="flex-1 text-center py-2 bg-white text-indigo-700 font-medium rounded hover:bg-gray-100" 
					onClick={handleCourseStart}
				>
					{buttonText(progress?.progress || 0)}
				</Button>
			</div>
		</div>
	)
};

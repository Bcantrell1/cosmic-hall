import { Course } from "@/app/lib/data";
import { Button } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";

export const CourseCard: React.FC<Course> = ({
	id,
	name,
	courseProgress,
}) => {
	const { currentUnit, totalUnits } = courseProgress;
	return (
		<div className="w-[350px] p-6 bg-indigo-800 text-white rounded-lg shadow-lg flex flex-col">
			<Image src={'https://placehold.co/350x200/png'} width={350} height={200} priority={true} alt="" />
			<div className="flex items-center gap-2 mb-4">
				<h3 className="text-xl font-semibold">{name}</h3>
			</div>

			<div className="space-y-2 mb-4">
				<p className="text-sm">Course Progress: Unit {currentUnit} of {totalUnits}</p>
			</div>

			<div className="space-y-2 mb-6">
				<div className="w-full h-2 bg-gray-200 rounded-full mt-2">
					<div
						className="h-2 bg-green-500 rounded-full"
						style={{ width: `${(currentUnit / totalUnits) * 100}%` }}
					/>
				</div>
			</div>

			<div className="mt-auto flex gap-4">
				<Button as={Link} href={`/course/${id}`} className="flex-1 text-center py-2 bg-white text-indigo-700 font-medium rounded hover:bg-gray-100">
					Start Course
				</Button>
			</div>
		</div>
	)
};

'use client'
import { addUserSessionProgress, addUserUnitProgress } from "@/app/actions/addProgressAction";
import { getSessionProgress, getUnitProgress } from "@/app/actions/getProgressAction";
import { Course, Session, Unit, UserSession, UserUnit } from "@/app/lib/data";
import { Button, Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";


type CourseViewerProps = {
	course: Course;
	units: Unit[];
	sessions: Session[];
	unitProgress?: UserUnit[];
	sessionProgress?: UserSession[];
	userId: string;
}

export const CourseViewer: React.FC<CourseViewerProps> = ({
	units,
	course,
	sessions,
	unitProgress,
	sessionProgress,
	userId
}) => {
	const router = useRouter();
	const buttonText = (progress: number) => {
		if (progress == 100) return "Review";
		if (progress == 0) return "Start";
		return "Continue";
	}

	const handleSessionStart = async (sessionId: number, unitId: number) => {
		try {
			const unitProgress = await getUnitProgress({ userId, unitId });
			if (unitProgress?.progress == 0 || unitProgress?.progress == null) {
				await addUserUnitProgress(userId, unitId, 1);
				await addUserSessionProgress(userId, sessionId, 1);
			} else {
				const sessionProgress = await getSessionProgress({ userId, sessionId });
				if (sessionProgress?.progress == 0) {
					await addUserSessionProgress(userId, sessionId, 1);
				}
			}
			router.push(`/course/${course.id}/session/${sessionId}`);
		} catch (error) {
			console.error("Error starting session", error);
		}
	}

	return (
	<div className="pt-3">
		<div className="mb-6">
			<h2 className="text-2xl font-bold">{course.title}</h2>
			<p className="text-gray-600 mt-2">{course.description}</p>
		</div>
		<div className="space-y-4">
			{units.map((unit, index) => (
				<Disclosure key={unit.id}>
					{({ open }) => (
						<div className="border rounded-lg">
							<DisclosureButton className="w-full p-4 flex justify-between items-center">
								<div className="flex items-center">
									<ChevronDown
										className={`w-5 h-5 transform transition-transform ${open ? 'rotate-180' : ''
											}`}
									/>
									<div className="pl-2">
										<h3 className="font-medium">Unit {index + 1}: {unit.title}</h3>
										<div className="w-full h-2 bg-gray-200 rounded-full mt-2">
											<div
												className="h-2 bg-green-500 rounded-full"
												style={{ width: `${unitProgress?.[index]?.progress ?? 0}%` }}
											/>
										</div>
									</div>
								</div>
							</DisclosureButton>
							<DisclosurePanel className="p-4 bg-gray-50">
								{sessions
									.filter(session => session.unit_id == unit.id)
									.map((session, index) => (
										<div
											key={session.id}
											className="flex justify-between items-center py-2"
										>
											<span>Session {index + 1}: {session.title}</span>
											<div className="flex items-center gap-4">
												<span className="text-gray-600">Duration: {session.duration} mins</span>
												{
													sessionProgress?.find(progress => progress.sessionId == session.id) ? (
														<Button onClick={() => handleSessionStart(session.id, unit.id)} className="px-3 py-1 text-sm bg-blue-500 text-white rounded">
															{buttonText(sessionProgress?.find(progress => progress.sessionId == session.id)?.progress ?? 0)}
														</Button>
													) : (
														<Button onClick={() => handleSessionStart(session.id, unit.id)} className="px-3 py-1 text-sm bg-blue-500 text-white rounded">
															{buttonText(0)}
														</Button>
													)
												}
											</div>
										</div>
									))}
							</DisclosurePanel>
						</div>
					)}
				</Disclosure>
			))}
		</div>
	</div>
	);
};
'use client'
import { getOptions } from "@/app/actions/getOptionsAction";
import { getUserAnswerProgressByActivityId } from "@/app/actions/getProgressAction";
import { getQuestions } from "@/app/actions/getQuestionsAction";
import { Activity, AnswerOption, Questions, Session, UserAnswer } from "@/app/lib/data";
import { Button } from "@headlessui/react";
import { useEffect, useState } from "react";
import Sidebar from "./SessionSidebar";
import { ActivityHeader } from "./components/ActivityHeader";
import { NavigationControls } from "./components/NavigationControls";
import { QuestionViewer } from "./components/QuestionViewer";

type SessionViewerProps = {
	session: Session;
	activities: Activity[];
	userId: string;
}

export const SessionViewer: React.FC<SessionViewerProps> = ({
	session,
	activities,
	userId,
}) => {
	const [selectedIndex, setSelectedIndex] = useState<number>(0);
	const { id, title } = session;
	const [questions, setQuestions] = useState<Questions[]>([]);
	const [options, setOptions] = useState<AnswerOption[]>([]);
	const [currentQuestion, setCurrentQuestion] = useState<Questions | null>(null);

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [userProgress, setUserProgress] = useState<UserAnswer[]>([]);
	const [isLoadingOptions, setIsLoadingOptions] = useState<boolean>(false);

	useEffect(() => {
		setIsLoading(true);
		if (activities.length > 0) {
			const fetchActivityQuestions = async () => {
				const questionsResponse = await getQuestions(activities[selectedIndex].id);
				if ('success' in questionsResponse && questionsResponse.success) {
					setQuestions(questionsResponse.questions || []);
					setCurrentQuestion(questionsResponse.questions?.[0] || null);
				} else if ('error' in questionsResponse) {
					console.error("Failed to fetch questions:", questionsResponse.error);
					setQuestions([]);
					setCurrentQuestion(null);
				}
	
				const userProgress = await getUserAnswerProgressByActivityId({ 
					userId, 
					activityId: activities[selectedIndex].id 
				});
				if (userProgress) {
					setUserProgress(userProgress);
				}
	
				setIsLoading(false);
			};
			fetchActivityQuestions();
		} else {
			console.log("No activities found");
			setIsLoading(false);
		}
	}, [selectedIndex, activities, userId]);
	
	useEffect(() => {
		if (currentQuestion) {
			setIsLoadingOptions(true);
			const fetchOptions = async () => {
				const optionsResponse = await getOptions(currentQuestion.id);
				if ('success' in optionsResponse && optionsResponse.success) {
					setOptions(optionsResponse.options || []);
					setIsLoadingOptions(false);
				} else if ('error' in optionsResponse) {
					console.error("Failed to fetch options:", optionsResponse.error);
					setOptions([]);
					setIsLoadingOptions(false);
				}
			};
			fetchOptions();
		}
	}, [currentQuestion]);
	


	const handleNext = () => {
		setSelectedIndex(selectedIndex + 1);
	}

	const handlePrevious = () => {
		setSelectedIndex(selectedIndex - 1);
	}

	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<div className="text-xl font-semibold">Loading...</div>
			</div>
		);
	}

	if (questions.length === 0) {
		return (
			<div className="flex flex-col justify-center items-center h-screen">
				<div className="text-xl font-semibold">No questions found</div>
				<Button onClick={handlePrevious}>Previous</Button>
			</div>
		);
	}

	return (
		<div className="flex">
			<Sidebar
				activities={activities}
				selectedIndex={selectedIndex}
				onChange={setSelectedIndex}
			/>
			<section className="flex flex-col w-full">
				<div className="flex flex-col sm:flex-row p-4 justify-between items-center bg-indigo-800 text-white rounded-t-lg shadow-md">
					<div className="flex flex-col sm:flex-row sm:gap-3 items-center mb-2 sm:mb-0">
						<div className="text-sm text-indigo-200">Session {id}</div>
						<h1 className="text-xl font-semibold">{title}</h1>
					</div>
					<div className="flex items-center gap-2 text-sm bg-indigo-700 px-3 py-1 rounded-full">
						<span className="font-semibold">{selectedIndex + 1}</span>
						<span className="text-indigo-200">of</span>
						<span className="font-semibold">{activities.length}</span>
					</div>
				</div>
				
				<div className="bg-white p-4 rounded-lg">
					<ActivityHeader
						title={activities[selectedIndex].title}
						duration={Number(activities[selectedIndex].duration)}
						userProgress={userProgress}
					/>
					<div className="text-md mt-2">
						{activities[selectedIndex]?.description}
					</div>

					{currentQuestion && userId && !isLoadingOptions && (
						<QuestionViewer
							userId={userId}
							currentQuestion={currentQuestion}
							options={options}
							userProgress={userProgress}
							activityId={activities[selectedIndex]?.id.toString()}
							unitId={questions[0]?.unit_id?.toString() || ''}
						/>
					)}

					<NavigationControls
						onNext={handleNext}
						onPrevious={handlePrevious}
						showNext={selectedIndex < activities.length - 1}
						showPrevious={selectedIndex > 0}
					/>
				</div>
			</section>
		</div>
	);
}
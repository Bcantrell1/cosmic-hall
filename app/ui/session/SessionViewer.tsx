'use client'
import { getOptions } from "@/app/actions/getOptionsAction";
import { getUserAnswerProgressByActivityId } from "@/app/actions/getProgressAction";
import { getQuestions } from "@/app/actions/getQuestionsAction";
import { Activity, AnswerOption, Questions, Session, UserAnswer } from "@/app/lib/data";
import { Button } from "@headlessui/react";
import { useEffect, useState } from "react";
import MultipleChoiceQuestion from "../activity/MultipleChoice";
import Sidebar from "./SessionSidebar";

type SessionViewerProps = {
	session: Session;
	activities: Activity[];
	userId: string;
}

export const SessionViewer: React.FC<SessionViewerProps> = ({
	session,
	activities,
	userId
}) => {
	const [selectedIndex, setSelectedIndex] = useState<number>(0);
	const { id, title } = session;
	const [questions, setQuestions] = useState<Questions[]>([]);
	const [options, setOptions] = useState<AnswerOption[]>([]);
	const [currentQuestion, setCurrentQuestion] = useState<Questions | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [userProgress, setUserProgress] = useState<UserAnswer[]>([]);

	useEffect(() => {
		setIsLoading(true);
		if(activities.length > 0) {
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
				if(questions[0]) {
					const optionsResponse = await getOptions(questions[0].id);
					if ('success' in optionsResponse && optionsResponse.success) {
						setOptions(optionsResponse.options || []);
					} else if ('error' in optionsResponse) {
						console.error("Failed to fetch options:", optionsResponse.error);
						setOptions([]);
					}
				}

				const userProgress = await getUserAnswerProgressByActivityId({ 
					userId, 
					activityId: activities[selectedIndex].id 
				});
				if(userProgress) {
					setUserProgress(userProgress);
				}

				setIsLoading(false);
			};
			fetchActivityQuestions();
		} else {
			console.log("No activities found");
			setIsLoading(false);
		}
	}, [selectedIndex, activities, questions, userId]);


	const handleNext = () => {
		setSelectedIndex(selectedIndex + 1);
	}

	const handlePrevious = () => {
		setSelectedIndex(selectedIndex - 1);
	}

	return (
		<div className="flex">
			<Sidebar
				activities={activities}
				selectedIndex={selectedIndex}
				onChange={setSelectedIndex}
			/>
			<section className="flex flex-col w-full">
				<div className="flex p-4 justify-between">
					<div className="flex gap-2">
						<div>{id}</div>
						<div>{title}</div>
					</div>
					<div className="flex gap-2">
						<div>{selectedIndex + 1}</div>
						of
						<div>{activities.length}</div>
					</div>
				</div>
				{isLoading ? (
					<div className="flex justify-center items-center h-screen">
						<div className="text-xl font-semibold">Loading...</div>
					</div>
				) : questions.length > 0 ? (
					<div className="bg-white p-4 rounded-lg">
						<div className="flex justify-between items-center">
							<h1 className="text-xl font-semibold">{activities[selectedIndex].title}</h1>
							<div className="space-x-4">
								<span className="text-gray-600"><span className="hidden md:inline-block">Duration:</span> {activities[selectedIndex].duration}min</span>
								<span className="text-gray-600"><span className="hidden md:inline-block">Status:</span> {userProgress.length > 0 ? "Completed" : "In Progress"}</span>
							</div>
						</div>
						{activities[selectedIndex]?.description}

						{currentQuestion && userId && (
							<MultipleChoiceQuestion userId={userId} questionId={currentQuestion.id} key={currentQuestion.id} questionNumber={currentQuestion.id} questionText={currentQuestion.question} options={options} userProgress={userProgress} />
						)}
						<div className="flex justify-end gap-2">
							{
								selectedIndex < activities.length - 1 && (
									<Button onClick={handleNext}>Next</Button>
								)
							}
							{
								selectedIndex > 0 && (
									<Button onClick={handlePrevious}>Previous</Button>
								)
							}
						</div>
					</div>
				) : (
					<div className="flex flex-col justify-center items-center h-screen">
						<div className="text-xl font-semibold">No questions found</div>
						<Button onClick={handlePrevious}>Previous</Button>
					</div>
				)}
			</section>
		</div>
	)
}
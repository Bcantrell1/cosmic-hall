'use client'
import { Activity, AnswerOption, Questions, Session } from "@/app/lib/data";
import { useEffect, useState } from "react";
import MultipleChoiceQuestion from "../activity/MultipleChoice";
import Sidebar from "./SessionSidebar";
import { Button } from "@headlessui/react";
import { getQuestions } from "@/app/actions/getQuestionsAction";
import { getOptions } from "@/app/actions/getOptionsAction";

type SessionViewerProps = {
	session: Session;
	activities: Activity[];
}

export const SessionViewer: React.FC<SessionViewerProps> = ({
	session,
	activities
}) => {
	const [selectedIndex, setSelectedIndex] = useState<number>(0);
	const { id, title } = session;
	const [questions, setQuestions] = useState<Questions[]>([]);
	const [options, setOptions] = useState<AnswerOption[]>([]);
	const [currentQuestion, setCurrentQuestion] = useState<Questions | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		setIsLoading(true);
		if(activities.length > 0) {
			const fetchActivityQuestions = async () => {
				const questions = await getQuestions(activities[selectedIndex].id);
				setQuestions(questions);
				setCurrentQuestion(questions[0]);
				if(questions[0]) {
					const options = await getOptions(questions[0].id);
					setOptions(options);
				}
				setIsLoading(false);
			};
			fetchActivityQuestions();
		} else {
			setIsLoading(false);
		}
	}, [selectedIndex, activities]);


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
								<span className="text-gray-600"><span className="hidden md:inline-block">Duration:</span> {activities[selectedIndex].duration}</span>
								<span className="text-gray-600"><span className="hidden md:inline-block">Status:</span> {activities[selectedIndex].status}</span>
							</div>
						</div>
						{activities[selectedIndex]?.description}

						{currentQuestion && (
							<MultipleChoiceQuestion key={currentQuestion.id} questionNumber={currentQuestion.id} questionText={currentQuestion.question} options={options} />
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
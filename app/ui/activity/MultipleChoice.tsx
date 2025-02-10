'use client'
import { addUserAnswerProgress } from '@/app/actions/addProgressAction';
import { getUserAnswerProgressByActivityId } from '@/app/actions/getProgressAction';
import { updateUserAnswerProgress, updateUserUnitProgress } from '@/app/actions/updateProgressAction';
import { AnswerOption, UserAnswer } from '@/app/lib/data';
import { Radio, RadioGroup } from '@headlessui/react';
import { CheckCircle, Circle } from 'lucide-react';
import React, { useState } from 'react';
import QuestionFeedback from './QuestionFeedback';

type MultipleChoiceQuestionProps = {
	questionNumber: number;
	questionText: string;
	options: AnswerOption[];
	userId: string;
	questionId: number;
	userProgress: UserAnswer[];
	activityId: number;
	unitId: number;
};


const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
	questionNumber,
	questionText,
	options,
	userId,
	questionId, 
	userProgress,
	activityId,
	unitId
}) => { 
	const [selectedAnswer, setSelectedAnswer] = useState<string | null>(() => {
		const existingAnswer = userProgress.find(answer => answer.questionId === questionId);
		return existingAnswer?.selectedOptionId?.toString() ?? null;
	}); 
	const [isCorrect, setIsCorrect] = useState<boolean | null>(() => {
		const existingAnswer = userProgress.find(answer => answer.questionId === questionId);
		return existingAnswer?.isCorrect === 1 ? true : false;
	}); 
	const [attemptNumber, setAttemptNumber] = useState<number>(() => {
		const existingAnswer = userProgress.find(answer => answer.questionId === questionId);
		return existingAnswer?.attemptNumber ?? 1;
	});

	const handleOptionSelect = async (optionId: string) => { 
		setSelectedAnswer(optionId); 
		const correctOption = options.find(option => option.correct === 1); 
		const correct = Boolean(correctOption?.id?.toString() === optionId?.toString());
		setIsCorrect(correct);

		const optionIdNumber = Number(optionId);

		const currentUserProgress = await getUserAnswerProgressByActivityId({userId, activityId});
		const existingAnswer = currentUserProgress?.find(answer => answer.questionId === questionId);
		console.log("existingAnswer", existingAnswer);
		
		try {
			if (existingAnswer) {
				await updateUserAnswerProgress(
					userId,
					questionId,
					existingAnswer.attemptNumber + 1,
					optionIdNumber,
					correct ? 1 : 0
				);
				setAttemptNumber(existingAnswer.attemptNumber + 1);
			} else {
				await addUserAnswerProgress(
					userId,
					questionId,
					unitId,
					1,
					optionIdNumber,
					correct ? 1 : 0
				);
			}

			// Update unit progress
			await updateUserUnitProgress(userId, unitId);

		} catch (error) {
			console.error('Failed to save answer and update progress:', error);
		}
	};

	return (
		<>
			<div className="flex items-start gap-2 mb-4">
				<QuestionFeedback
					selectedAnswer={selectedAnswer} 
					isCorrect={isCorrect} 
				/>
				<p className="text-sm">
					<span className="font-medium">{questionNumber}. </span>
					{questionText}
				</p>
				<p className="text-sm">Attempt Number: {attemptNumber}</p>
			</div>

			<RadioGroup
				value={selectedAnswer}
				onChange={(value) => handleOptionSelect(value?.toString() ?? '')}
				className="ml-8 space-y-2"
				disabled={isCorrect !== null && isCorrect === true}
			>
				{options.length > 0 && options.map((option) => (
					<Radio 
						key={option.id} 
						value={option.id.toString()}
					>
						{({ checked }) => (
							<label
								className={`flex items-center gap-3 cursor-pointer ${
									checked ? 'text-indigo-500' : 'text-gray-700'
								}`}
							>
								<div className="flex items-center justify-center">
									{checked ? (
										<CheckCircle className="w-6 h-6 text-indigo-500" />
									) : (
										<Circle className="w-6 h-6 text-gray-300" />
									)}
								</div>
								<span className="text-sm">{option.description}</span>
							</label>
						)}
					</Radio>
				))}
			</RadioGroup>
		</>
	);
};

export default MultipleChoiceQuestion;

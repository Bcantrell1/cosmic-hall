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
	questionText: string;
	options: AnswerOption[];
	userId: string;
	questionId: number;
	userProgress: UserAnswer[];
	activityId: number;
	unitId: number;
};


const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
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

			await updateUserUnitProgress(userId, unitId);

		} catch (error) {
			console.error('Failed to save answer and update progress:', error);
		}
	};

	return (
		<div className="w-full">
			<div className="flex flex-col gap-2 mb-4 mt-4">
            <div className="flex justify-between items-center w-full">
                <div className="text-xs font-medium text-gray-500">
                    Attempt{ Number(attemptNumber) > 1 ? `s` : null} {attemptNumber}
                </div>
            </div>
            <div className="flex items-start gap-2">
                <QuestionFeedback
                    selectedAnswer={selectedAnswer} 
                    isCorrect={isCorrect} 
                />
                <p className="text-sm flex-grow">
                    {questionText}
                </p>
            </div>
        </div>

			<RadioGroup
				value={selectedAnswer}
				onChange={(value) => handleOptionSelect(value?.toString() ?? '')}
				className="space-y-3 md:ml-8"
				disabled={isCorrect !== null && isCorrect === true}
			>
				{options.length > 0 && options.map((option) => (
					<Radio 
						key={option.id} 
						value={option.id.toString()}
					>
						{({ checked }) => (
							<label
								className={`flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer ${
									checked ? 'text-indigo-500 bg-indigo-50' : 'text-gray-700'
								}`}
							>
								<div className="flex items-center justify-center flex-shrink-0">
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
		</div>
	);
};

export default MultipleChoiceQuestion;

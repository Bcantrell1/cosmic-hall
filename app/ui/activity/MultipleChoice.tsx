import { AnswerOption } from '@/app/lib/data';
import { Radio, RadioGroup } from '@headlessui/react';
import { CheckCircle, Circle } from 'lucide-react';
import React, { useState } from 'react';
import QuestionFeeback from './QuestionFeedback';

type MultipleChoiceQuestionProps = {
	questionNumber: number;
	questionText: string;
	options: AnswerOption[];
};

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
	questionNumber,
	questionText,
	options,
}) => {
	const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
	const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

	const handleOptionSelect = (optionId: string) => {
		setSelectedAnswer(optionId);
		const correctOption = options.find(option => option.correct === 1);
		const correct = Boolean(correctOption?.id?.toString() === optionId?.toString());
        setIsCorrect(correct);
		if(correct) {
			console.log("correct");
			// TODO: update user progress
		}
	};

	return (
		<>
			<div className="flex items-start gap-2 mb-4">
				<QuestionFeeback
					selectedAnswer={selectedAnswer} 
					isCorrect={isCorrect} 
				/>
				<p className="text-sm">
					<span className="font-medium">{questionNumber}. </span>
					{questionText}
				</p>
			</div>

			<RadioGroup
				value={selectedAnswer}
				onChange={(value) => handleOptionSelect(value as string)}
				className="ml-8 space-y-2"
				disabled={isCorrect !== null && isCorrect === true}
			>
				{
					options.length > 0 && options.map((option) => (
					<Radio key={option.id} value={option.id}>
						{({ checked }) => (
							<label
								className={`flex items-center gap-3 cursor-pointer ${checked ? 'text-indigo-500' : 'text-gray-700'
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

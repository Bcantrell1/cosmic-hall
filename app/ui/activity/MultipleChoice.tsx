import { AnswerOption } from '@/app/lib/data';
import { Radio, RadioGroup } from '@headlessui/react';
import { CheckCircle, Circle } from 'lucide-react';
import React, { useState } from 'react';

type MultipleChoiceQuestionProps = {
  questionNumber: string;
  questionText: string;
  options: AnswerOption[];
  correctAnswer: string;
  onAnswerSelected?: (isCorrect: boolean) => void;
};

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
  questionNumber,
  questionText,
  options,
  correctAnswer,
  onAnswerSelected,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleOptionSelect = (optionId: string) => {
    setSelectedAnswer(optionId);
    const correct = optionId === correctAnswer;
    setIsCorrect(correct);
    if (onAnswerSelected) {
      onAnswerSelected(correct);
    }
  };

  return (
    <>
      <div className="flex items-start gap-2 mb-4">
        {selectedAnswer && isCorrect === false && (
          <div className="flex-shrink-0 mt-1">
            <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
              <span className="text-white text-sm">×</span>
            </div>
          </div>
        )}
        {selectedAnswer && isCorrect === true && (
          <div className="flex-shrink-0 mt-1">
            <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
              <span className="text-white text-sm">
                <CheckCircle color="green" />
              </span>
            </div>
          </div>
        )}
        <p className="text-sm">
          <span className="font-medium">{questionNumber}. </span>
          {questionText}
        </p>
      </div>

      <RadioGroup
        value={selectedAnswer}
        onChange={(value) => handleOptionSelect(value as string)}
        className="ml-8 space-y-2"
      >
        {options.map((option) => (
          <Radio key={option.id} value={option.id}>
            {({ checked }) => (
              <label
                className={`flex items-center gap-3 cursor-pointer ${
                  checked ? 'text-blue-500' : 'text-gray-700'
                }`}
              >
                <div className="flex items-center justify-center">
                  {checked ? (
                    <CheckCircle className="w-6 h-6 text-blue-500" />
                  ) : (
                    <Circle className="w-6 h-6 text-gray-300" />
                  )}
                </div>
                <span className="text-sm">{option.text}</span>
              </label>
            )}
          </Radio>
        ))}
      </RadioGroup>
    </>
  );
};

export default MultipleChoiceQuestion;

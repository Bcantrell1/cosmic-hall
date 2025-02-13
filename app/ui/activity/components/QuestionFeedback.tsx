import { CheckCircle, X } from 'lucide-react';
import React from 'react';

const QuestionFeedback = ({
    isCorrect,
    selectedAnswer,
}: {
    isCorrect: boolean | null;
    selectedAnswer: string | null | undefined;
}) => {
    if (!selectedAnswer) return null;

    return (
        <div className="relative flex-shrink-0 flex items-center">
            <div
                className={`
          flex items-center justify-center
          w-6 h-6 md:w-7 md:h-7
          rounded-full
          ${isCorrect ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}
        `}
            >
                {isCorrect ? (
                    <CheckCircle className="w-5 h-5 md:w-6 md:h-6" />
                ) : (
                    <X className="w-5 h-5 md:w-6 md:h-6" />
                )}
            </div>
        </div>
    );
};

export default QuestionFeedback;

import { CheckCircle, X } from 'lucide-react';
import React from 'react';

const QuestionFeeback = ({ isCorrect, selectedAnswer }: {isCorrect: boolean | null, selectedAnswer: string|null}) => {
  if (!selectedAnswer) return null;

  return (
    <div className="flex-shrink-0 mt-1">
      <div 
        className={`w-5 h-5 rounded-full flex items-center justify-center
          ${isCorrect ? 'bg-green-500' : 'bg-red-500'}`}
      >
        {isCorrect ? (
          <CheckCircle className="text-white w-4 h-4" />
        ) : (
          <X className="text-white w-4 h-4" />
        )}
      </div>
    </div>
  );
};

export default QuestionFeeback;
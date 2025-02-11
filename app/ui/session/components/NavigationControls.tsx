import { Button } from "@headlessui/react";

type NavigationControlsProps = {
  onNext?: () => void;
  onPrevious?: () => void;
  showNext: boolean;
  showPrevious: boolean;
};

export const NavigationControls = ({ 
  onNext, 
  onPrevious, 
  showNext, 
  showPrevious 
}: NavigationControlsProps) => (
  <div className="flex justify-end gap-3">
    {showPrevious && (
      <Button
        onClick={onPrevious}
        className="flex items-center gap-2 px-4 py-2 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors duration-200"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span>Previous</span>
      </Button>
    )}
    
    {showNext && (
      <Button
        onClick={onNext}
        className="flex items-center gap-2 px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors duration-200"
      >
        <span>Next</span>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Button>
    )}
  </div>
); 
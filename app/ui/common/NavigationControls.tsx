import { Button } from '@headlessui/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
    showPrevious,
}: NavigationControlsProps) => (
    <div className="flex justify-end gap-3">
        {showPrevious && (
            <Button
                onClick={onPrevious}
                className="flex items-center gap-2 px-4 py-2 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors duration-200"
            >
                <ChevronLeft className="w-5 h-5" />
                <span>Previous</span>
            </Button>
        )}

        {showNext && (
            <Button
                onClick={onNext}
                className="flex items-center gap-2 px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors duration-200"
            >
                <span>Next</span>
                <ChevronRight className="w-5 h-5" />
            </Button>
        )}
    </div>
);

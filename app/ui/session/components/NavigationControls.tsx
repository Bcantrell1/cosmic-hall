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
  <div className="flex justify-end gap-2">
    {showNext && <Button onClick={onNext}>Next</Button>}
    {showPrevious && <Button onClick={onPrevious}>Previous</Button>}
  </div>
); 
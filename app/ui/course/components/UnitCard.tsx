import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import { Unit, UserUnit, Session, UserSession } from "@/app/lib/data";
import { UnitProgressBar } from "./UnitProgressBar";
import { SessionList } from "./SessionList";

type UnitCardProps = {
    unit: Unit;
    index: number;
    sessions: Session[];
    unitProgress?: UserUnit[];
    sessionProgress?: UserSession[];
    onSessionStart: (sessionId: number, unitId: number) => void;
}

export const UnitCard: React.FC<UnitCardProps> = ({
    unit,
    index,
    sessions,
    unitProgress,
    sessionProgress,
    onSessionStart
}) => {
    const progress = unitProgress?.find(progress => progress.unitId === unit.id)?.progress ?? 0;

    return (
        <div className="border border-indigo-100 rounded-lg">
            <div className="p-4 border-b border-indigo-100">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <h3 className="font-medium">Unit {index + 1}: {unit.title}</h3>
                    <span className="text-sm text-gray-600">
                        {progress}% Complete
                    </span>
                </div>
                <UnitProgressBar progress={progress} />
            </div>
            
            <Disclosure>
                {({ open }) => (
                    <div>
                        <DisclosureButton className="w-full p-4 flex justify-between items-center hover:bg-indigo-50">
                            <span>View Sessions</span>
                            <ChevronDown
                                className={`w-5 h-5 transform transition-transform ${open ? 'rotate-180' : ''}`}
                            />
                        </DisclosureButton>
                        <DisclosurePanel>
                            <SessionList
                                sessions={sessions}
                                unitId={unit.id}
                                sessionProgress={sessionProgress}
                                onSessionStart={onSessionStart}
                            />
                        </DisclosurePanel>
                    </div>
                )}
            </Disclosure>
        </div>
    );
}; 
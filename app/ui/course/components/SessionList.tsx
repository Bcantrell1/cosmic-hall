import { Button } from '@headlessui/react';
import { Session, UserSession } from '@/app/lib/data';

type SessionListProps = {
    sessions: Session[];
    unitId: number;
    sessionProgress?: UserSession[];
    onSessionStart: (sessionId: number, unitId: number) => void;
};

export const SessionList: React.FC<SessionListProps> = ({
    sessions,
    unitId,
    sessionProgress,
    onSessionStart,
}) => {
    const buttonText = (progress: number) => {
        if (progress == 100) return 'Review';
        if (progress == 0) return 'Start';
        return 'Continue';
    };

    return (
        <div className="p-4 bg-indigo-50">
            {sessions
                .filter((session) => session.unit_id == unitId)
                .map((session, index) => (
                    <div key={session.id} className="flex justify-between items-center py-2">
                        <span>
                            {index + 1}. {session.title}
                        </span>
                        <div className="flex items-center gap-4">
                            <span className="text-gray-600 hidden sm:block">
                                Duration: {session.duration} mins
                            </span>
                            <Button
                                onClick={() => onSessionStart(session.id, unitId)}
                                className="px-3 py-1 text-sm bg-indigo-600 text-white rounded"
                            >
                                {buttonText(
                                    sessionProgress?.find(
                                        (progress) => progress.sessionId == session.id
                                    )?.progress ?? 0
                                )}
                            </Button>
                        </div>
                    </div>
                ))}
        </div>
    );
};
